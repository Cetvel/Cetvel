// lib/services/goal-service.ts

import axios from 'axios';
import { toast } from 'sonner';
import { mutate } from 'swr';

const handleGoalAction = async (
  action: string,
  goalData: Partial<Goal>,
  goalId?: string
): Promise<boolean> => {
  try {
    let response;
    switch (action) {
      case 'oluşturma':
        response = await axios.post('/api/goals', goalData);
        break;
      case 'güncelleme':
        response = await axios.put(`/api/goals/${goalId}`, goalData);
        break;
      case 'silme':
        response = await axios.delete(`/api/goals/${goalId}`);
        break;
      default:
        throw new Error('Geçersiz işlem');
    }

    if (response.status >= 200 && response.status < 300) {
      toast.success(`Hedef ${action}`, {
        description: 'İşlem başarıyla tamamlandı.',
      });
      mutate('/goals');
      return true;
    } else {
      toast.error(`Hedef ${action} başarısız`, {
        description: response.data?.error || 'Bir hata oluştu.',
      });
      return false;
    }
  } catch (error: any) {
    toast.error(`Hedef ${action} başarısız`, {
      description:
        error.response?.data?.error ||
        `Hedef ${action} sırasında bir hata oluştu.`,
    });
    return false;
  }
};

export const createGoal = (goalData: Partial<Goal>) =>
  handleGoalAction('oluşturma', goalData);

export const updateGoal = (goalId: string, goalData: Partial<Goal>) =>
  handleGoalAction('güncelleme', goalData, goalId);

export const deleteGoal = (goalId: string) =>
  handleGoalAction('silme', {}, goalId);
