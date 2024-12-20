import React from 'react';
import { Combobox } from '@/components/ui/combobox';
import { AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import Spinner from '@/components/ui/spinner';

type Props = {
  onChange: (value: string) => void;
};

const TagFilter = ({ onChange }: Props) => {
  const { data: tags, isLoading, error } = useSWR<Tag[]>('/tags', fetcher);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    console.error(error);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertCircle size={18} className='text-destructive' />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Etiketler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Combobox
      className={'w-[120px]'}
      itemValue={tags!.length ? tags![0].label : ''}
      onChange={onChange}
      items={tags!}
      searchText='Etiket Ara...'
      emptyText='Etiket bulunamadı.'
      selectText='Etiket'
      searchable
    />
  );
};

export default TagFilter;
