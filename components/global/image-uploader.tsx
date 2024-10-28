export type ImageUploaderProps = {
  onChange: (url: string) => void;
  value?: string;
  cropConfig: CropConfig;
  className?: string;
  maxSize?: number;
  accept?: string;
  placeholder?: string;
  width?: number;
  height?: number;
};

import React from 'react';
import { CropConfig, ImageCropper } from './image-cropper';
import { Button } from '@/components/ui/button';
import { ImageIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import Image from 'next/image';
import { useEdgeStore } from '@/lib/edgestore';
import Spinner from '../ui/spinner';

export const ImageUploader = ({
  onChange,
  value,
  cropConfig,
  className,
  maxSize = 5,
  accept = 'image/*',
  placeholder = 'Fotoğraf yükle veya sürükle bırak',
  height: imageHeight,
  width: imageWidth,
}: ImageUploaderProps) => {
  const [tempImage, setTempImage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { edgestore } = useEdgeStore();
  1;
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      if (file.size > maxSize * 1024 * 1024) {
        toast.error(`Dosya boyutu ${maxSize}MB'dan küçük olmalıdır`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      [accept]: [],
    },
    maxFiles: 1,
  });

  const handleCrop = async (croppedImageBlob: Blob) => {
    setIsLoading(true);

    try {
      const res = await edgestore.publicFiles.upload({
        file: new File([croppedImageBlob], 'cropped-image.jpg', {
          type: 'image/jpeg',
        }),
        options: {
          replaceTargetUrl: value,
        },
      });

      onChange(res.url);
      setTempImage(null);
    } catch (error) {
      toast.error('Fotoğraf yüklenirken bir hata oluştu');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      if (value) {
        await edgestore.publicFiles.delete({
          url: value,
        });
        onChange('');
      }
    } catch (error: any) {
      toast.error('Fotoğraf silinirken bir hata oluştu');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={cn('relative group', className)}>
        {value ? (
          <div
            style={{ width: imageWidth, height: imageHeight }}
            className='relative'
          >
            <Image
              src={value}
              alt='Uploaded'
              width={imageWidth}
              height={imageHeight}
              className={cn(
                'object-cover',
                cropConfig.cropShape === 'round' ? 'rounded-full' : 'rounded-xl'
              )}
            />
            <div
              className={cn(
                'absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2',
                {
                  'rounded-full': cropConfig.cropShape === 'round',
                  'rounded-xl': cropConfig.cropShape !== 'round',
                }
              )}
            >
              <div {...getRootProps()}>
                <Button
                  type='button'
                  size='sm'
                  variant='secondary'
                  disabled={isLoading || isDeleting}
                >
                  {isLoading ? <Spinner size={14} /> : <UploadIcon size={14} />}
                </Button>
                <input {...getInputProps()} />
              </div>
              <Button
                size='sm'
                type='button'
                variant='destructive'
                onClick={handleDelete}
                disabled={isDeleting || isLoading}
              >
                {isDeleting ? <Spinner size={14} /> : <Trash2Icon size={14} />}
              </Button>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer',
              isDragActive && 'border-primary bg-muted/50',
              cropConfig.cropShape === 'round' && 'rounded-full'
            )}
          >
            <input {...getInputProps()} />
            <div className='flex flex-col items-center justify-center gap-2 text-muted-foreground'>
              <ImageIcon className='w-8 h-8' />
              <p className='text-sm text-center'>{placeholder}</p>
            </div>
          </div>
        )}
      </div>

      {tempImage && (
        <ImageCropper
          image={tempImage}
          onCrop={handleCrop}
          onCancel={() => setTempImage(null)}
          cropConfig={cropConfig}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
