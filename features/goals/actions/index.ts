import { ApiResponseHandler } from '@/lib/api-response-handler';
import { axiosInstance } from '@/lib/utils';

const goalHandler = new ApiResponseHandler({
  resourceName: 'Hedef',
  cachePaths: ['/goals'],
  customMessages: {
    error: 'Etiket işlemi başarısız',
  },
  toastOptions: {
    duration: 3000,
  },
});

export const createGoal = async (goalData: Partial<Goal>): Promise<boolean> => {
  try {
    await axiosInstance.post('/goals', goalData);
    return true;
  } catch (error: any) {
    return goalHandler.handleError(error, 'oluşturma');
  }
};

export const updateGoal = async (
  goalId: string,
  goalData: Partial<Goal>
): Promise<boolean> => {
  try {
    await axiosInstance.put(`/goals/${goalId}`, goalData);
    return true;
  } catch (error: any) {
    return goalHandler.handleError(error, 'güncelleme');
  }
};

export const deleteGoal = async (goalId: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/goals/${goalId}`);
    return true;
  } catch (error: any) {
    return goalHandler.handleError(error, 'silme');
  }
};
