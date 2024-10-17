import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection, DropzoneOptions } from 'react-dropzone';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
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

interface ImageCropperProps {
  image: string;
  onCropComplete: (crop: PixelCrop) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });

  return (
    <ReactCrop
      src={image}
      crop={crop}
      onChange={(_, percentCrop) => setCrop(percentCrop)}
      onComplete={(c) => onCropComplete(c)}
      aspect={1}
    >
      <NextImage
        src={image}
        alt='Kırpılacak fotoğraf'
        width={400}
        height={400}
      />
    </ReactCrop>
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

  const handleCropComplete = (cropResult: PixelCrop) => {
    if (!previewImage) return;

    const image = new Image();
    image.src = previewImage;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Canvas context is not supported.');
        return;
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = cropResult.width;
      canvas.height = cropResult.height;

      ctx.drawImage(
        image,
        cropResult.x * scaleX,
        cropResult.y * scaleY,
        cropResult.width * scaleX,
        cropResult.height * scaleY,
        0,
        0,
        cropResult.width,
        cropResult.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          setError('Failed to create image blob.');
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        setCroppedImageUrl(croppedImageUrl);
      }, 'image/jpeg');
    };
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
