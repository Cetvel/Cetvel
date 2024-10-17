'use client';
import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { axiosInstance } from '@/lib/utils';
export default function Page() {
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const { edgestore } = useEdgeStore();
  return (
    <div>
      <Input
        type='file'
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <Button
        type='button'
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress: any) => {
                setProgress(progress);
              },
            });

            const apiRes = await axiosInstance.post('/picture/cover/url', {
              url: res.url,
            });
          }
        }}
      >
        Resim Yükle
      </Button>
      {progress > 0 && <Progress value={progress} />}
    </div>
  );
}
