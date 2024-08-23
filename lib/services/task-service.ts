import { mutate } from "swr";
import { axiosInstance } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface TaskApiResponse {
  data: any;
  status: number;
}

const handleApiResponse = (
  response: TaskApiResponse,
  action: string
): boolean => {
  console.log(`API Response for ${action}:`, response);

  if (response.status >= 200 && response.status < 300) {
    toast({
      title: `Görev ${action}`,
      description: "İşlem başarıyla tamamlandı.",
    });
    mutate("/todo/today");
    mutate("/todo");
    return true;
  } else {
    toast({
      title: `Görev ${action} başarısız`,
      description: response.data?.error || "Bir hata oluştu.",
      variant: "destructive",
    });
    return false;
  }
};

const handleApiError = (error: any, action: string): boolean => {
  console.error(`API Error for ${action}:`, error);

  toast({
    title: `Görev ${action} başarısız`,
    description:
      error.response?.data?.error ||
      `Görev ${action} sırasında bir hata oluştu.`,
    variant: "destructive",
  });
  return false;
};

export const createTask = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post("/todo", values);
    return handleApiResponse(
      { data: res.data, status: res.status },
      "oluşturma"
    );
  } catch (error: any) {
    return handleApiError(error, "oluşturma");
  }
};

export const updateTask = async (
  taskId: string,
  values: any
): Promise<boolean> => {
  try {
    const res = await axiosInstance.put(`/todo/${taskId}`, values);
    return handleApiResponse(
      { data: res.data, status: res.status },
      "güncelleme"
    );
  } catch (error: any) {
    return handleApiError(error, "güncelleme");
  }
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(`/todo/${taskId}`);
    return handleApiResponse({ data: res.data, status: res.status }, "silme");
  } catch (error: any) {
    return handleApiError(error, "silme");
  }
};

export const toggleTaskComplete = async (task: Task): Promise<boolean> => {
  const newStatus = task.status === "completed" ? "incomplete" : "completed";
  return updateTask(task._id, { ...task, status: newStatus });
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const res = await axiosInstance.get("/todo");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getTodayTasks = async (): Promise<Task[]> => {
  try {
    const res = await axiosInstance.get("/todo/today");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching today's tasks:", error);
    return [];
  }
};
