'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Upload, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ImageType = 'cover' | 'timer';

interface ImageUploadState {
  file: File | null;
  previewUrl: string | null;
  isUploading: boolean;
  error: string | null;
}

const PreferencesPage = () => {
  const { setTheme } = useTheme();
  const { userId } = useAuth();
  const generateUploadUrl = useMutation(api.image.image.generateUploadUrl);
  const sendCoverImage = useMutation(api.image.image.sendCoverImage);
  const sendTimerImage = useMutation(api.image.image.sendTimerImage);

  const [images, setImages] = React.useState<
    Record<ImageType, ImageUploadState>
  >({
    cover: { file: null, previewUrl: null, isUploading: false, error: null },
    timer: { file: null, previewUrl: null, isUploading: false, error: null },
  });

  const fileInputRefs = {
    cover: React.useRef<HTMLInputElement>(null),
    timer: React.useRef<HTMLInputElement>(null),
  };

  const isValidFileType = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
  };

  const handleImageSelect =
    (type: ImageType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (isValidFileType(file)) {
          setImages((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              file,
              previewUrl: URL.createObjectURL(file),
              error: null,
            },
          }));
        } else {
          setImages((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              error:
                'PNG dosyaları kabul edilmiyor. Lütfen JPEG, JPG, GIF veya WebP formatlarını kullanın.',
            },
          }));
        }
      }
    };

  const handleDrop =
    (type: ImageType) => (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (file) {
        if (isValidFileType(file)) {
          setImages((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              file,
              previewUrl: URL.createObjectURL(file),
              error: null,
            },
          }));
        } else {
          setImages((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              error:
                'PNG dosyaları kabul edilmiyor. Lütfen JPEG, JPG, GIF veya WebP formatlarını kullanın.',
            },
          }));
        }
      }
    };

  async function handleSendImage(
    type: ImageType,
    sendImageMutation: typeof sendCoverImage | typeof sendTimerImage
  ) {
    const imageState = images[type];
    if (!imageState.file || !userId) return;

    setImages((prev) => ({
      ...prev,
      [type]: { ...prev[type], isUploading: true, error: null },
    }));

    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': imageState.file.type },
        body: imageState.file,
      });
      const { storageId } = await result.json();
      await sendImageMutation({ storageId, clerkId: userId });

      setImages((prev) => ({
        ...prev,
        [type]: {
          file: null,
          previewUrl: null,
          isUploading: false,
          error: null,
        },
      }));
      if (fileInputRefs[type].current) fileInputRefs[type].current.value = '';
    } catch (error) {
      console.error(`Upload error for ${type}:`, error);
      setImages((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          isUploading: false,
          error: 'Yükleme başarısız oldu. Lütfen tekrar deneyin.',
        },
      }));
    }
  }

  const renderImageUploader = (type: ImageType) => {
    const { file, previewUrl, isUploading, error } = images[type];
    return (
      <div className='space-y-2'>
        <Label htmlFor={`${type}Image`} className='text-sm font-medium'>
          {type === 'cover' ? 'Kapak Resmi' : 'Zamanlayıcı Resmi'}
        </Label>
        <div
          className={cn(
            'flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors',
            'hover:border-primary',
            error ? 'border-destructive' : 'border-muted'
          )}
          onDrop={handleDrop(type)}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRefs[type].current?.click()}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={`${type} Preview`}
              width={100}
              height={100}
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
            id={`${type}Image`}
            ref={fileInputRefs[type]}
            onChange={handleImageSelect(type)}
            className='hidden'
            accept='image/jpeg,image/jpg,image/gif,image/webp'
          />
        </div>
        {error && <p className='text-sm text-destructive'>{error}</p>}
        <Button
          onClick={() =>
            handleSendImage(
              type,
              type === 'cover' ? sendCoverImage : sendTimerImage
            )
          }
          disabled={!file || isUploading}
          className='w-full'
          variant={file && !isUploading ? 'default' : 'secondary'}
        >
          {isUploading
            ? 'Yükleniyor...'
            : `${type === 'cover' ? 'Kapak' : 'Zamanlayıcı'} Resmini Yükle`}
        </Button>
      </div>
    );
  };

  if (!userId)
    return (
      <div className='text-center py-4'>Foto yüklemek için giriş yapın</div>
    );

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Tercihler</CardTitle>
        <CardDescription>Uygulama deneyiminizi özelleştirin</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center justify-between'>
          <Label htmlFor='theme'>Tema</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Temayı değiştir</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Açık
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Koyu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                Sistem
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {renderImageUploader('cover')}
          {renderImageUploader('timer')}
        </div>

        <div className='flex items-center justify-between'>
          <Label htmlFor='notifications'>Bildirimleri Etkinleştir</Label>
          <Switch id='notifications' />
        </div>
        <div className='flex items-center justify-between'>
          <Label htmlFor='taskReminders'>Görev Hatırlatıcıları</Label>
          <Switch id='taskReminders' />
        </div>
        <div className='flex items-center justify-between'>
          <Label htmlFor='reminderFrequency'>Görev Hatırlatma Sıklığı</Label>
          <div className='flex items-center space-x-2'>
            <Input type='number' id='reminderFrequency' className='w-20' />
            <span>Saatte bir</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesPage;
