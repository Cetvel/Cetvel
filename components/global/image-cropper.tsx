import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Cropper, { Area } from 'react-easy-crop';
import Spinner from '../ui/spinner';

export type CropConfig = {
  aspect: number;
  cropShape?: 'rect' | 'round';
  minWidth?: number;
  minHeight?: number;
};

type Props = {
  image: string;
  onCrop: (croppedImage: Blob) => void;
  onCancel: () => void;
  cropConfig: CropConfig;
  isLoading?: boolean;
};

export const ImageCropper = ({
  image,
  onCrop,
  onCancel,
  cropConfig,
  isLoading,
}: Props) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null
  );
  const [isCropping, setIsCropping] = React.useState(false);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createCroppedImage = async () => {
    try {
      setIsCropping(true);
      if (!croppedAreaPixels) return;

      const canvas = document.createElement('canvas');
      const img = new Image();
      img.src = image; // Burada düzeltme yapıldı - önceden image değişkeni yanlış kullanılıyordu

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(
        img,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob(
        (blob) => {
          if (blob) onCrop(blob);
        },
        'image/jpeg',
        0.95
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsCropping(false);
    }
  };

  const pending = isCropping || isLoading;

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Fotoğrafı Kırp</DialogTitle>
        </DialogHeader>
        <div className='relative w-full h-[400px]'>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={cropConfig.aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape={cropConfig.cropShape || 'rect'}
          />
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onCancel}>
            İptal
          </Button>
          <Button disabled={pending} onClick={createCroppedImage}>
            {pending && <Spinner />}
            Kırp ve Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
