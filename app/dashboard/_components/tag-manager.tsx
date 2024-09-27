'use client';

import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  PlusIcon,
  Pencil,
  Trash2,
  Check,
  X,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { createTag, updateTag, deleteTag } from '@/lib/services/tag-service';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/utils';
import Spinner from '@/components/ui/spinner';

interface Tag {
  _id: string;
  label: string;
  value: string;
}

const TagManager: React.FC = () => {
  const { data: tags, isLoading, error } = useSWR<Tag[]>('/tags', fetcher);
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const handleCreateTag = useCallback(async () => {
    if (!newTagName.trim()) return;

    const newTag = {
      _id: `temp-${Date.now()}`,
      label: newTagName,
      value: newTagName,
    };

    mutate('/tag', [...(tags || []), newTag], false);

    setNewTagName('');
    const success = await createTag({
      label: newTagName,
      value: newTagName,
    });
    if (!success) {
      mutate('/tag', tags, false);
    } else {
      mutate('/tag');
    }
  }, [newTagName, tags]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleCreateTag();
      }
    },
    [handleCreateTag]
  );

  const handleUpdateTag = useCallback(
    async (tag: Tag) => {
      if (!editingTag) return;

      const updatedTag = {
        ...tag,
        label: editingTag.label,
        value: editingTag.label,
      };

      mutate(
        '/tag',
        tags?.map((t) => (t._id === tag._id ? updatedTag : t)),
        false
      );

      const success = await updateTag(tag._id, updatedTag);
      if (!success) {
        mutate('/tag', tags, false);
      } else {
        mutate('/tag');
      }
      setEditingTag(null);
    },
    [editingTag, tags]
  );

  const handleEditKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, tag: Tag) => {
      if (event.key === 'Enter') {
        handleUpdateTag(tag);
      }
    },
    [handleUpdateTag]
  );

  const handleDeleteTag = useCallback(
    async (tagId: string) => {
      mutate(
        '/tag',
        tags?.filter((tag) => tag._id !== tagId),
        false
      );

      const success = await deleteTag(tagId);
      if (!success) {
        mutate('/tag', tags, false);
      } else {
        mutate('/tag');
      }
    },
    [tags]
  );

  if (isLoading) return <Spinner />;
  if (error) {
    console.log('Error fetching tags:', error);
    return <AlertCircle size={18} className='text-destructive' />;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon-sm'>
          <Tag className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <Input
              placeholder='Yeni etiket (Oluşturmak için Enter)'
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyPress={handleKeyPress}
              className='flex-grow text-sm'
            />
          </div>
          <div className='max-h-60 overflow-y-auto'>
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <div
                  key={tag._id}
                  className='flex items-center justify-between gap-2 border rounded-md p-1 pl-3 mb-2 group'
                >
                  {editingTag?._id === tag._id ? (
                    <>
                      <Input
                        value={editingTag.label}
                        onChange={(e) =>
                          setEditingTag({
                            ...editingTag,
                            label: e.target.value,
                          })
                        }
                        onKeyPress={(e) => handleEditKeyPress(e, tag)}
                        className='flex-grow'
                      />
                      <Button
                        onClick={() => handleUpdateTag(tag)}
                        size='icon-sm'
                        variant='ghost'
                        className='text-green-500 hover:text-green-500 hover:bg-green-500/10'
                      >
                        <Check className='h-4 w-4' />
                      </Button>
                      <Button
                        onClick={() => setEditingTag(null)}
                        size='icon-sm'
                        variant='ghost'
                        className='text-destructive hover:text-destructive hover:bg-destructive/10'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className='text-sm'>{tag.label}</span>
                      <div className='opacity-100 lg:opacity-0 group-hover:opacity-100'>
                        <Button
                          onClick={() => setEditingTag(tag)}
                          size='icon-sm'
                          variant='ghost'
                        >
                          <Pencil className='h-4 w-4' />
                        </Button>
                        <Button
                          onClick={() => handleDeleteTag(tag._id)}
                          size='icon-sm'
                          variant='ghost'
                          className='text-destructive hover:text-destructive hover:bg-destructive/10'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div>Henüz etiket yok.</div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TagManager;
