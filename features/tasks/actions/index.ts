import { axiosInstance } from '@/lib/utils';
import { ApiResponseHandler } from '@/lib/api-response-handler';
import { mutate } from 'swr';
import axios from 'axios';

const taskHandler = new ApiResponseHandler({
  resourceName: 'Görev',
  cachePaths: ['/tasks', '/tasks/today'],
  customMessages: {
    success: 'Görev işlemi başarılı',
    error: 'Görev işlemi başarısız',
  },
  toastOptions: {
    duration: 3000,
  },
});

export const createTask = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/tasks', values);
    return taskHandler.handleResponse(res, 'oluşturma');
  } catch (error: any) {
    return taskHandler.handleError(error, 'oluşturma');
  }
};

export const updateTask = async (
  taskId: string,
  values: any
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put(`/tasks/${taskId}`, values);
    return taskHandler.handleResponse(res, 'güncelleme');
  } catch (error: any) {
    return taskHandler.handleError(error, 'güncelleme');
  }
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/tasks/${taskId}`);
    return taskHandler.handleResponse(res, 'silme');
  } catch (error: any) {
    return taskHandler.handleError(error, 'silme');
  }
};

export const toggleTaskComplete = async (task: Task): Promise<boolean> => {
  const newStatus = task.status === 'completed' ? 'incomplete' : 'completed';
  return updateTask(task._id, { ...task, status: newStatus });
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const res = await axiosInstance.get('/tasks');
    return res.data;
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const getTodayTasks = async (): Promise<Task[]> => {
  try {
    const res = await axiosInstance.get('/tasks/today');
    return res.data;
  } catch (error: any) {
    console.error("Error fetching today's tasks:", error);
    return [];
  }
};

export const deleteManyTasks = async (taskIds: string[]): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete('/tasks/many', {
      data: { ids: taskIds },
    });
    return taskHandler.handleResponse(res, 'silme');
  } catch (error: any) {
    return taskHandler.handleError(error, 'silme');
  }
};

export const completeManyTasks = async (
  taskIds: string[]
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put('/tasks/many', {
      ids: taskIds,
      updateData: { status: 'completed' },
    });
    return taskHandler.handleResponse(res, 'tamamlama');
  } catch (error: any) {
    return taskHandler.handleError(error, 'tamamlama');
  }
};

export const incompleteManyTasks = async (
  taskIds: string[]
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put('/tasks/many', {
      ids: taskIds,
      updateData: { status: 'incomplete' },
    });
    return taskHandler.handleResponse(res, 'tamamlamayı geri alma');
  } catch (error: any) {
    return taskHandler.handleError(error, 'tamamlamayı geri alma');
  }
};

export const getRecommendedTasks = async (options: any = {}) => {
  const { signal, axiosInstance = axios } = options;

  try {
    const response = await axiosInstance.get('/gemini/task-suggester', {
      signal,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    if (response.status === 200) {
      axiosInstance.post('/gemini/apiTenancy');
      mutate('/users');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Önerilen görevler alınamadı.');
  }
};
