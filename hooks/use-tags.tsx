import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/utils";

interface Tag {
  id: number;
  label: string;
  value: string;
}

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get<Tag[]>("/tag");
        setTags(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Bir hata oluştu"));
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};
