import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import { mutate } from 'swr';

interface Tag {
  _id: string;
  label: string;
  value: string;
}

interface TagApiResponse {
  data: Tag;
  status: number;
}

const handleApiResponse = (
  response: TagApiResponse,
  action: string
): Tag | null => {
  console.log(`API Response for ${action}:`, response);

  if (response.status >= 200 && response.status < 300) {
    mutate('/tags');
    return response.data;
  } else {
    toast.error(`Etiket ${action} başarısız`, {
      description: 'Bir hata oluştu.',
    });
    return null;
  }
};

const handleApiError = (error: any, action: string): null => {
  console.error(`API Error for ${action}:`, error);

  toast.error(`Etiket ${action} başarısız`, {
    description:
      error.response?.data?.error ||
      `Etiket ${action} sırasında bir hata oluştu.`,
  });
  return null;
};

export const createTag = async (
  values: Omit<Tag, '_id'>
): Promise<Tag | null> => {
  try {
    const res = await axiosInstance.post<Tag>('/tags', values);
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
  values: Partial<Omit<Tag, '_id'>>
): Promise<Tag | null> => {
  try {
    const res = await axiosInstance.put<Tag>(`/tags/${tagId}`, values);
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
    const result = handleApiResponse(
      { data: res.data, status: res.status },
      'silme'
    );
    return result !== null;
  } catch (error: any) {
    handleApiError(error, 'silme');
    return false;
  }
};
