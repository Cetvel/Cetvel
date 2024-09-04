import { axiosInstance } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
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
    toast({
      title: `Pomodoro ${action}`,
      description: 'İşlem başarıyla tamamlandı.',
    });
    mutate('/pomodoro');
    return true;
  } else {
    toast({
      title: `Pomodoro ${action} başarısız`,
      description: response.data?.error || 'Bir hata oluştu.',
      variant: 'destructive',
    });
    return false;
  }
};

const handleApiError = (error: any, action: string): boolean => {
  console.error(`Pomodoro ${action} hatası:`, error);
  toast({
    title: `Pomodoro ${action} başarısız`,
    description:
      error.response?.data?.error ||
      `Pomodoro ${action} sırasında bir hata oluştu.`,
    variant: 'destructive',
  });
  return false;
};

export const createFocusSession = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/pomodoro', values);
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
    const res = await axiosInstance.put(`/pomodoro/${id}`, values);
    return handleApiResponse(res, 'güncelleme');
  } catch (error: any) {
    return handleApiError(error, 'güncelleme');
  }
};

export const deleteFocusSession = async (id: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/pomodoro/${id}`);
    return handleApiResponse(res, 'silme');
  } catch (error: any) {
    return handleApiError(error, 'silme');
  }
};

export const deleteMultipleFocusSessions = async (
  ids: string[]
): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete('/pomodoro/many', {
      data: { ids },
    });
    return handleApiResponse(res, 'silme');
  } catch (error: any) {
    return handleApiError(error, 'silme');
  }
};
