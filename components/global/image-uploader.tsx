'use client';
import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import Spinner from '../ui/spinner';

type ImageUploaderProps = {
  label: string;
  apiEndpoint: string;
};

export default function ImageUploader({
  label,
  apiEndpoint,
}: ImageUploaderProps) {
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { edgestore } = useEdgeStore();

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress: any) => {
          setProgress(progress);
        },
      });

      const apiRes = await axiosInstance.put(`${apiEndpoint}`, {
        url: res.url,
      });

      if (apiRes.status >= 200 && apiRes.status < 300) {
        toast.success('Resim yüklendi', {
          description: 'Resim başarıyla yüklendi.',
        });
        setFile(undefined);
        setProgress(0);
      } else {
        toast.error('Resim yüklenemedi', {
          description: apiRes.data?.error || 'Bir hata oluştu.',
        });
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Resim yüklenirken bir hata oluştu', {
        description: error.response?.data?.error || 'Bir hata oluştu.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Label>
      {label}
      <div className='flex flex-col gap-4 mt-4'>
        <Input
          type='file'
          className='border-2 border-dashed cursor-pointer'
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
          disabled={isLoading}
        />
        <Button
          type='button'
          size={'sm'}
          disabled={!file || isLoading}
          onClick={handleUpload}
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <Spinner className='w-4 h-4' />
              {progress === 100
                ? 'Kaydediliyor...'
                : `Yükleniyor... ${progress}%`}
            </div>
          ) : (
            'Resim Yükle'
          )}
        </Button>
      </div>
    </Label>
  );
}
