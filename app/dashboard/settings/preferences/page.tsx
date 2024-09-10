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
import { Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import ImageUploader from '@/components/global/image-uploader';

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
  const sendCoverImage = useMutation(api.image.image.sendCoverImage);
  const sendTimerImage = useMutation(api.image.image.sendTimerImage);
  const generateUploadUrl = useMutation(api.image.image.generateUploadUrl);

  const handleCoverImageUpload = async (file: File) => {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    const { storageId } = await result.json();
    await sendCoverImage({ storageId, clerkId: userId! });
  };

  const handleTimerImageUpload = async (file: File) => {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    const { storageId } = await result.json();
    await sendTimerImage({ storageId, clerkId: userId! });
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Tercihler</CardTitle>
        <CardDescription>Uygulama deneyiminizi özelleştirin</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='form-line'>
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
          <ImageUploader
            label='Kapak arkaplanı'
            onUpload={handleCoverImageUpload}
            onError={(error) => console.error(error)}
          />
          <ImageUploader
            label='Zamanlayıcı arkaplanı'
            onUpload={handleTimerImageUpload}
            onError={(error) => console.error(error)}
          />
        </div>

        <div className='form-line'>
          <Label htmlFor='notifications'>Bildirimleri Etkinleştir</Label>
          <Switch id='notifications' />
        </div>
        <div className='form-line'>
          <Label htmlFor='taskReminders'>Görev Hatırlatıcıları</Label>
          <Switch id='taskReminders' />
        </div>
        <div className='form-line'>
          <Label htmlFor='reminderFrequency'>Görev Hatırlatma Sıklığı</Label>
          <div className='flex items-center space-x-2'>
            <Input type='number' id='reminderFrequencyHours' className='w-20' />
            <span>saat aralıklarla hatırlatma yap</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesPage;
