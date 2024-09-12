import { axiosInstance } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface OnboardingApiResponse {
  data: any;
  status: number;
}

const handleApiResponse = (
  response: OnboardingApiResponse,
  action: string
): boolean => {
  console.log(`API Response for ${action}:`, response.status);

  if (response.status >= 200 && response.status < 300) {
    return true;
  } else {
    toast({
      title: `Onboarding ${action} başarısız`,
      description: response.data?.error || 'Bir hata oluştu.',
      variant: 'destructive',
    });
    return false;
  }
};

const handleApiError = (error: any, action: string): boolean => {
  console.error(`API Error for ${action}:`, error);

  toast({
    title: `Onboarding ${action} başarısız`,
    description:
      error.response?.data?.error ||
      `Onboarding ${action} sırasında bir hata oluştu.`,
    variant: 'destructive',
  });
  return false;
};

export const submitOnboarding = async (values: any): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/onboarding', values);
    return handleApiResponse(
      { data: res.data, status: res.status },
      'gönderme'
    );
  } catch (error: any) {
    return handleApiError(error, 'gönderme');
  }
};
