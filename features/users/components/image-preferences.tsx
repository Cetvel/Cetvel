import { ImageUploader } from '@/components/global/image-uploader';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import { mutate } from 'swr';

export const ImagePreferences = ({ user }: { user: User }) => {
  const onImageChange = async (url: string, type: 'cover' | 'timer') => {
    try {
      await axiosInstance.put(`/picture/${type}`, { url });
      toast.success('İşlem başarılı');
      mutate('/users');
    } catch (error: any) {
      toast.error('İşlem sırasında bir hata oluştu');
    }
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <ImageUploader
        onChange={(url) => onImageChange(url, 'cover')}
        value={user?.cover_picture || '/image/banner_default.jpg'}
        width={400}
        className='w-full'
        height={225}
        layout='responsive'
        cropConfig={{
          aspect: 16 / 9,
          minWidth: 400,
          minHeight: 225,
        }}
        maxSize={5}
        placeholder='Karşılayıcı arkaplan fotoğrafı yükle'
      />
      <ImageUploader
        onChange={(url) => onImageChange(url, 'timer')}
        value={user?.timer_picture || '/image/timer_default.jpg'}
        width={400}
        className='w-full'
        height={225}
        layout='responsive'
        cropConfig={{
          aspect: 16 / 9,
          minWidth: 400,
          minHeight: 225,
        }}
        maxSize={5}
        placeholder='Zamanlayıcı arkaplan fotoğrafı yükle'
      />
    </div>
  );
};
