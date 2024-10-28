import { toast } from 'sonner';
import { mutate } from 'swr';

interface EmailApiResponse {
  data: any;
  status: number;
}

const handleApiResponse = (
  response: EmailApiResponse,
  action: string
): boolean => {
  console.log(`API Response for ${action}:`, response);

  if (response.status >= 200 && response.status < 300) {
    toast.success(`Görev ${action}`, {
      description: 'İşlem başarıyla tamamlandı.',
    });
    mutate('/settings/user/email');
    mutate('/users');
    return true;
  } else {
    toast.error(`Görev ${action} başarısız`, {
      description: response.data?.error || 'Bir hata oluştu.',
    });
    return false;
  }
};
