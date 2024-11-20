import { ApiResponseHandler } from '@/lib/api-response-handler';
import { axiosInstance } from '@/lib/utils';

const tagHandler = new ApiResponseHandler({
  resourceName: 'Etiket',
  cachePaths: ['/tags'],
  customMessages: {
    success: 'Etiket işlemi başarılı',
    error: 'Etiket işlemi başarısız',
  },
  toastOptions: {
    duration: 3000,
  },
});

export const createTag = async (values: Omit<Tag, '_id'>): Promise<boolean> => {
  try {
    const res = await axiosInstance.post<Tag>('/tags', values);
    return tagHandler.handleResponse(res, 'oluşturma');
  } catch (error: any) {
    return tagHandler.handleError(error, 'oluşturma');
  }
};

export const updateTag = async (
  tagId: string,
  values: Partial<Omit<Tag, '_id'>>
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put<Tag>(`/tags/${tagId}`, values);
    return tagHandler.handleResponse(res, 'güncelleme');
  } catch (error: any) {
    return tagHandler.handleError(error, 'güncelleme');
  }
};

export const deleteTag = async (tagId: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/tags/${tagId}`);
    return tagHandler.handleResponse(res, 'silme');
  } catch (error: any) {
    return tagHandler.handleError(error, 'silme');
  }
};
