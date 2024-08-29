import { axiosInstance } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";

interface ExamApiResponse {
  data: any;
  status: number;
}

type ExamType = "tyt" | "ayt" | "lgs" | "dgs" | "yds" | "ales" | "kpss";
type AYTField = "say" | "ea" | "soz";

const handleApiResponse = (
  response: ExamApiResponse,
  action: string
): boolean => {
  if (response.status >= 200 && response.status < 300) {
    toast({
      title: `Sınav ${action}`,
      description: "İşlem başarıyla tamamlandı.",
    });
    mutate("/exam");
    return true;
  } else {
    toast({
      title: `Sınav ${action} başarısız`,
      description: response.data?.error || "Bir hata oluştu.",
      variant: "destructive",
    });
    return false;
  }
};

const handleApiError = (error: any, action: string): boolean => {
  console.error(`Sınav ${action} hatası:`, error);
  toast({
    title: `Sınav ${action} başarısız`,
    description:
      error.response?.data?.error ||
      `Sınav ${action} sırasında bir hata oluştu.`,
    variant: "destructive",
  });
  return false;
};

export const createExam = async (
  examType: ExamType,
  values: any,
  aytField?: AYTField
): Promise<boolean> => {
  try {
    let url = `/exam/${examType}`;
    if (examType === "ayt" && aytField) {
      url += `/${aytField}`;
    }

    // LGS için özel işlem
    if (examType === "lgs") {
      const { educationStyle, ...restValues } = values;
      const examData =
        educationStyle === "din"
          ? { ...restValues, religion: restValues.religion || {} }
          : {
              ...restValues,
              foreignLanguage: restValues.foreignLanguage || {},
            };

      const res = await axiosInstance.post(url, examData);
      return handleApiResponse(res, "oluşturma");
    }

    const res = await axiosInstance.post(url, values);
    return handleApiResponse(res, "oluşturma");
  } catch (error: any) {
    return handleApiError(error, "oluşturma");
  }
};

export const updateExam = async (
  examType: ExamType,
  id: string,
  values: any,
  aytField?: AYTField
): Promise<boolean> => {
  try {
    let url = `/exam/update/${examType}/${id}`;
    if (examType === "ayt" && aytField) {
      url += `/${aytField}`;
    }
    const res = await axiosInstance.put(url, values);
    return handleApiResponse(res, "güncelleme");
  } catch (error: any) {
    return handleApiError(error, "güncelleme");
  }
};

export const deleteExam = async (
  examType: ExamType,
  id: string,
  aytField?: AYTField
): Promise<boolean> => {
  try {
    let url = `/exam/delete/${examType}/${id}`;
    if (examType === "ayt" && aytField) {
      url += `/${aytField}`;
    }
    const res = await axiosInstance.delete(url);
    return handleApiResponse(res, "silme");
  } catch (error: any) {
    return handleApiError(error, "silme");
  }
};

export const getExamDetails = async (
  examType: ExamType,
  id: string,
  aytField?: AYTField
): Promise<any> => {
  try {
    let url = `/exam/${examType}/${id}`;
    if (examType === "ayt" && aytField) {
      url += `/${aytField}`;
    }
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error: any) {
    handleApiError(error, "detayları alma");
    return null;
  }
};
