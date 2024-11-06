import { axiosInstance } from '@/lib/utils';
import { ApiResponseHandler } from '@/lib/api-response-handler';

const focusHandler = new ApiResponseHandler({
  resourceName: 'Odaklanma oturumu',
  cachePaths: ['/pomodoros', '/pomodoros/today'],
  customMessages: {
    success: 'Odaklanma oturumu işlemi başarılı',
    error: 'Odaklanma oturumu işlemi başarısız',
  },
  toastOptions: {
    duration: 3000,
  },
});

export const createFocusSession = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/pomodoros', values);
    return focusHandler.handleResponse(res, 'oluşturma');
  } catch (error: any) {
    return focusHandler.handleError(error, 'oluşturma');
  }
};

export const updateFocusSession = async (
  id: string,
  values: any
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put(`/pomodoros/${id}`, values);
    return focusHandler.handleResponse(res, 'güncelleme');
  } catch (error: any) {
    return focusHandler.handleError(error, 'güncelleme');
  }
};

export const deleteFocusSession = async (id: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/pomodoros/${id}`);
    return focusHandler.handleResponse(res, 'silme');
  } catch (error: any) {
    return focusHandler.handleError(error, 'silme');
  }
};

export const deleteMultipleFocusSessions = async (
  ids: string[]
): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete('/pomodoros/many', {
      data: { ids },
    });
    return focusHandler.handleResponse(res, 'silme');
  } catch (error: any) {
    return focusHandler.handleError(error, 'silme');
  }
};
