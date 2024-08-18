import { fetcher } from "@/lib/utils";
import { useState, useEffect } from "react";
import useSWR from "swr";

interface Tag {
  id: number;
  label: string;
  value: string;
}

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { data, error: fetchError } = useSWR<Tag[]>("/tag", fetcher);

  useEffect(() => {
    if (data) {
      setTags(data);
      setLoading(false);
    }

    if (fetchError) {
      setError(fetchError);
      setLoading(false);
    }
  }, [data, fetchError]);

  return { tags, loading, error };
};
