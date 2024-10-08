import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
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
    mutate('/tags');
    return true;
  } else {
    toast.error(`Etiket ${action} başarısız`, {
      description: response.data?.error || 'Bir hata oluştu.',
    });
    return false;
  }
};

const handleApiError = (error: any, action: string): boolean => {
  console.error(`API Error for ${action}:`, error);

  toast.error(`Etiket ${action} başarısız`, {
    description:
      error.response?.data?.error ||
      `Etiket ${action} sırasında bir hata oluştu.`,
  });
  return false;
};

export const createTag = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/tags', values);
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
    const res = await axiosInstance.put(`/tags/${tagId}`, values);
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
    const res = await axiosInstance.delete(`/tags/${tagId}`);
    return handleApiResponse({ data: res.data, status: res.status }, 'silme');
  } catch (error: any) {
    return handleApiError(error, 'silme');
  }
};
