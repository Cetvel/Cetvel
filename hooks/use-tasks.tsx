import useSWR from 'swr';
import { getTasksPaginated } from '@/lib/services/task-service';

interface UseTasksOptions {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
  search?: string;
}

export function useTasks(options: UseTasksOptions) {
  const { data, error, mutate } = useSWR(
    [`/tasks`, options],
    () => getTasksPaginated(options),
    {
      revalidateOnFocus: false,
      refreshInterval: 10000,
    }
  );

  return {
    tasks: data?.data,
    meta: data?.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
