import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection, DropzoneOptions } from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import NextImage from 'next/image';
import { useModal } from '@/providers/modal-provider';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onError: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, onError }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
      if (fileRejections.length > 0) {
        onError(fileRejections[0].errors[0].message);
      }
    },
    [onFileSelect, onError]
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  return (
    <div
      {...getRootProps()}
      className='border-2 p-6 flex flex-col space-y-6 justify-center items-center border-dashed rounded-xl cursor-pointer'
    >
      <Upload size={32} className='text-muted-foreground' />
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Dosyayı buraya bırakın...</p>
      ) : (
        <p>Fotoğraf yüklemek için tıklayın veya sürükleyin</p>
      )}
    </div>
  );
};

// Ana bileşen
const ProfilePhotoUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setClose } = useModal();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleUpload = () => {
    if (!croppedImageUrl || !selectedFile) {
      setError('No image selected or cropped.');
      return;
    }
    console.log('Fotoğraf yükleniyor:', croppedImageUrl);
    setClose();
  };

  return (
    <div>
      {error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!selectedFile && (
        <FileUpload onFileSelect={handleFileSelect} onError={handleError} />
      )}
      {selectedFile && !croppedImageUrl && (
        <div>
          <Label className='mb-2 block'>Fotoğrafı Kırpın</Label>
          {previewImage && (
            <ImageCropper
              image={previewImage}
              onCropComplete={handleCropComplete}
            />
          )}
        </div>
      )}
      {croppedImageUrl && (
        <div>
          <Label className='mb-2 block'>Ön İzleme</Label>
          <NextImage
            src={croppedImageUrl}
            width={128}
            height={128}
            alt='Kırpılmış profil fotoğrafı'
            className='mt-2 rounded-full w-32 h-32 object-cover'
          />
        </div>
      )}
      <div>
        {croppedImageUrl && (
          <Button onClick={handleUpload} className='w-full'>
            Fotoğrafı Yükle
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
