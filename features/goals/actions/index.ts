import { ApiResponseHandler } from '@/lib/api-response-handler';
import { axiosInstance } from '@/lib/utils';

const goalHandler = new ApiResponseHandler({
  resourceName: 'Hedef',
  cachePaths: ['/goals'],
  customMessages: {
    success: 'Hedef işlemi başarılı',
    error: 'Etiket işlemi başarısız',
  },
  toastOptions: {
    duration: 3000,
  },
});

export const createGoal = async (goalData: Partial<Goal>): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/goals', goalData);
    return goalHandler.handleResponse(res, 'oluşturma');
  } catch (error: any) {
    return goalHandler.handleError(error, 'oluşturma');
  }
};

export const updateGoal = async (
  goalId: string,
  goalData: Partial<Goal>
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put(`/goals/${goalId}`, goalData);
    return goalHandler.handleResponse(res, 'güncelleme');
  } catch (error: any) {
    return goalHandler.handleError(error, 'güncelleme');
  }
};

export const deleteGoal = async (goalId: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/goals/${goalId}`);
    return goalHandler.handleResponse(res, 'silme');
  } catch (error: any) {
    return goalHandler.handleError(error, 'silme');
  }
};
