import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import { mutate } from 'swr';

interface FocusApiResponse {
  data: any;
  status: number;
}

const handleApiResponse = (
  response: FocusApiResponse,
  action: string
): boolean => {
  if (response.status >= 200 && response.status < 300) {
    toast.success(`Odaklanma oturumu ${action}`, {
      description: 'İşlem başarıyla tamamlandı.',
    });
    mutate('/pomodoros');
    return true;
  } else {
    toast.error(`Odaklanma oturumu ${action} başarısız`, {
      description: response.data?.error || 'Bir hata oluştu.',
    });
    return false;
  }
};

const handleApiError = (error: any, action: string): boolean => {
  console.error(`Odaklanma oturumu ${action} hatası:`, error);
  toast.error(`Odaklanma oturumu ${action} başarısız`, {
    description:
      error.response?.data?.error ||
      `Odaklanma oturumu ${action} sırasında bir hata oluştu.`,
  });
  return false;
};

export const createFocusSession = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/pomodoros', values);
    return handleApiResponse(res, 'oluşturma');
  } catch (error: any) {
    return handleApiError(error, 'oluşturma');
  }
};

export const updateFocusSession = async (
  id: string,
  values: any
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put(`/pomodoros/${id}`, values);
    return handleApiResponse(res, 'güncelleme');
  } catch (error: any) {
    return handleApiError(error, 'güncelleme');
  }
};

export const deleteFocusSession = async (id: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/pomodoros/${id}`);
    return handleApiResponse(res, 'silme');
  } catch (error: any) {
    return handleApiError(error, 'silme');
  }
};

export const deleteMultipleFocusSessions = async (
  ids: string[]
): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete('/pomodoros/many', {
      data: { ids },
    });
    return handleApiResponse(res, 'silme');
  } catch (error: any) {
    return handleApiError(error, 'silme');
  }
};
