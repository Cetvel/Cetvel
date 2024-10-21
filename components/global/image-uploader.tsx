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

  const { edgestore } = useEdgeStore();

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
        />
        <Button
          type='button'
          size={'sm'}
          disabled={!file}
          onClick={async () => {
            if (file) {
              try {
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress: any) => {
                    setProgress(progress);
                  },
                });

                const apiRes = await axiosInstance.post(
                  `${apiEndpoint}/${res.url}`
                );

                if (apiRes.status >= 200 && apiRes.status < 300) {
                  toast.success('Resim yüklendi', {
                    description: 'Resim başarıyla yüklendi.',
                  });
                } else {
                  toast.error('Resim yüklenemedi', {
                    description: apiRes.data?.error || 'Bir hata oluştu.',
                  });
                }
              } catch (error: any) {
                console.error(error);
                toast.error('Resim yüklenirken bir hata oluştu', {
                  description:
                    error.response?.data?.error || 'Bir hata oluştu.',
                });
              }
            }
          }}
        >
          Resim Yükle
        </Button>
      </div>
    </Label>
  );
}
