import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import Spinner from '../ui/spinner';

interface ImageUploaderProps {
  label: string;
  onUpload: (file: File) => Promise<void>;
  onError: (error: string) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  previewSize?: { width: number; height: number };
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  onUpload,
  onError,
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
  maxFileSize = 5 * 1024 * 1024,
  previewSize = { width: 100, height: 100 },
  className,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    handleFile(selectedFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile: File | undefined) => {
    if (selectedFile) {
      if (!acceptedFileTypes.includes(selectedFile.type)) {
        setError(
          `Geçersiz dosya türü. Kabul edilen türler: ${acceptedFileTypes.join(', ')}`
        );
        return;
      }
      if (selectedFile.size > maxFileSize) {
        setError(
          `Dosya boyutu çok büyük. Maksimum boyut: ${maxFileSize / 1024 / 1024}MB`
        );
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      await onUpload(file);
      setFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Bir hata oluştu.';
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      onError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label
        htmlFor={`${label.toLowerCase().replace(/\s+/g, '-')}Image`}
        className='text-sm font-medium'
      >
        {label}
      </Label>
      <div
        className={cn(
          'flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors',
          'hover:border-primary',
          error ? 'border-destructive' : 'border'
        )}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt='Preview'
            width={previewSize.width}
            height={previewSize.height}
            className='object-cover rounded-md'
          />
        ) : (
          <div className='text-center'>
            <ImageIcon className='mx-auto h-8 w-8 text-muted-foreground' />
            <p className='mt-2 text-sm text-muted-foreground'>
              Sürükle & Bırak veya Tıkla
            </p>
          </div>
        )}
        <input
          type='file'
          id={`${label.toLowerCase().replace(/\s+/g, '-')}Image`}
          ref={fileInputRef}
          onChange={handleFileSelect}
          className='hidden'
          accept={acceptedFileTypes.join(',')}
        />
      </div>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      <Button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className='w-full'
        variant={file && !isUploading ? 'default' : 'secondary'}
      >
        {isUploading ? <Spinner /> : `${label} Yükle`}
      </Button>
    </div>
  );
};

export default ImageUploader;
