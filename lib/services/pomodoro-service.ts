import { axiosInstance } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface PomodoroApiResponse {
  data: any;
  status: number;
}

const handleApiResponse = (
  response: PomodoroApiResponse,
  action: string
): boolean => {
  if (response.status >= 200 && response.status < 300) {
    toast({
      title: `Pomodoro ${action}`,
      description: "İşlem başarıyla tamamlandı.",
    });
    return true;
  } else {
    toast({
      title: `Pomodoro ${action} başarısız`,
      description: response.data?.error || "Bir hata oluştu.",
      variant: "destructive",
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
    variant: "destructive",
  });
  return false;
};

export const createPomodoro = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post("/pomodoro", values);
    return handleApiResponse(res, "oluşturma");
  } catch (error: any) {
    return handleApiError(error, "oluşturma");
  }
};

export const updatePomodoro = async (
  id: string,
  values: any
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put(`/pomodoro/${id}`, values);
    return handleApiResponse(res, "güncelleme");
  } catch (error: any) {
    return handleApiError(error, "güncelleme");
  }
};

export const deletePomodoro = async (id: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/pomodoro/${id}`);
    return handleApiResponse(res, "silme");
  } catch (error: any) {
    return handleApiError(error, "silme");
  }
};