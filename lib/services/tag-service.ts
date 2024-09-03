import { axiosInstance } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { mutate } from 'swr';

interface TagApiResponse {
  data: any;
  status: number;
}

const handleApiResponse = (
  response: TagApiResponse,
  action: string
): boolean => {
  console.log(`API Response for ${action}:`, response);

  if (response.status >= 200 && response.status < 300) {
    mutate('/tag');
    return true;
  } else {
    toast({
      title: `Etiket ${action} başarısız`,
      description: response.data?.error || 'Bir hata oluştu.',
      variant: 'destructive',
    });
    return false;
  }
};

const handleApiError = (error: any, action: string): boolean => {
  console.error(`API Error for ${action}:`, error);

  toast({
    title: `Etiket ${action} başarısız`,
    description:
      error.response?.data?.error ||
      `Etiket ${action} sırasında bir hata oluştu.`,
    variant: 'destructive',
  });
  return false;
};

export const createTag = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/tag', values);
    return handleApiResponse(
      { data: res.data, status: res.status },
      'oluşturma'
    );
  } catch (error: any) {
    return handleApiError(error, 'oluşturma');
  }
};

export const updateTag = async (
  tagId: string,
  values: any
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put(`/tag/${tagId}`, values);
    return handleApiResponse(
      { data: res.data, status: res.status },
      'güncelleme'
    );
  } catch (error: any) {
    return handleApiError(error, 'güncelleme');
  }
};

export const deleteTag = async (tagId: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/tag/${tagId}`);
    return handleApiResponse({ data: res.data, status: res.status }, 'silme');
  } catch (error: any) {
    return handleApiError(error, 'silme');
  }
};
