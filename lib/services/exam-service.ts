import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import { mutate } from 'swr';

interface ExamApiResponse {
  data: any;
  status: number;
}

const handleApiResponse = (
  response: ExamApiResponse,
  action: string
): boolean => {
  if (response.status >= 200 && response.status < 300) {
    toast.success(`Sınav ${action}`, {
      description: 'İşlem başarıyla tamamlandı.',
    });
    mutate('/exams');
    return true;
  } else {
    toast.error(`Sınav ${action}`, {
      description: response.data?.error || 'Bir hata oluştu.',
    });
    return false;
  }
};

const handleApiError = (error: any, action: string): boolean => {
  console.error(`Sınav ${action} hatası:`, error);
  toast.error(`Sınav ${action} başarısız`, {
    description:
      error.response?.data?.error ||
      `Sınav ${action} sırasında bir hata oluştu.`,
  });
  return false;
};

export const createExam = async (
  examType: ExamType,
  values: any
): Promise<boolean> => {
  try {
    let url = `/exams/${examType.toLowerCase()}`;

    if (examType === 'LGS') {
      const { educationStyle, ...restValues } = values;
      const examData =
        educationStyle === 'din'
          ? { ...restValues, religion: restValues.religion || {} }
          : {
              ...restValues,
              foreignLanguage: restValues.foreignLanguage || {},
            };

      const res = await axiosInstance.post(url, examData);
      return handleApiResponse(res, 'oluşturma');
    }

    const res = await axiosInstance.post(url, values);
    return handleApiResponse(res, 'oluşturma');
  } catch (error: any) {
    return handleApiError(error, 'oluşturma');
  }
};

export const updateExam = async (
  examType: ExamType,
  id: string,
  values: any
): Promise<boolean> => {
  try {
    let url = `/exams/update/${examType}/${id}`;

    const res = await axiosInstance.put(url, values);
    return handleApiResponse(res, 'güncelleme');
  } catch (error: any) {
    return handleApiError(error, 'güncelleme');
  }
};

export const deleteExam = async (id: string): Promise<boolean> => {
  try {
    let url = `/exams/delete/${id}`;
    const res = await axiosInstance.delete(url);
    return handleApiResponse(res, 'silme');
  } catch (error: any) {
    return handleApiError(error, 'silme');
  }
};

export const getExamDetails = async (
  examType: ExamType,
  id: string
): Promise<any> => {
  try {
    let url = `/exams/${examType}/${id}`;
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error: any) {
    handleApiError(error, 'detayları alma');
    return null;
  }
};

export const deleteManyExams = async (ids: string[]): Promise<boolean> => {
  try {
    let url = `/exams/many`;
    const res = await axiosInstance.delete(url, { data: { ids } });
    return handleApiResponse(res, 'silme');
  } catch (error: any) {
    return handleApiError(error, 'silme');
  }
};
