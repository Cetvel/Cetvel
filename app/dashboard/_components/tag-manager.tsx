'use client';

import React, { useState, useCallback, useTransition } from 'react';
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
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import Spinner from '@/components/ui/spinner';
import { useOptimistic } from 'react';

const TagManager: React.FC = () => {
  const {
    data: tags,
    isLoading,
    error,
    mutate,
  } = useSWR<Tag[]>('/tags', fetcher);
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const [optimisticTags, setOptimisticTags] = useOptimistic(
    tags,
    (state, newTags: Tag[]) => newTags
  );

  const handleCreateTag = useCallback(async () => {
    if (!newTagName.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const newTag = {
      _id: tempId,
      label: newTagName,
      value: newTagName,
    };

    setOptimisticTags((currentTags) => [...(currentTags || []), newTag]);
    setNewTagName('');

    try {
      const createdTag = await createTag({
        label: newTagName,
        value: newTagName,
      });

      if (createdTag) {
        setOptimisticTags((currentTags) =>
          currentTags?.map((tag) =>
            tag._id === tempId ? { ...tag, _id: createdTag._id } : tag
          )
        );
        mutate();
      }
    } catch (error) {
      console.error('Error creating tag:', error);
      setOptimisticTags((currentTags) =>
        currentTags?.filter((tag) => tag._id !== tempId)
      );
    }
  }, [newTagName, setOptimisticTags, mutate]);

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

      setOptimisticTags(
        (currentTags) =>
          currentTags?.map((t) => (t._id === tag._id ? updatedTag : t)) || []
      );

      try {
        const success = await updateTag(tag._id, updatedTag);
        if (success) {
          mutate();
        }
      } catch (error) {
        console.error('Error updating tag:', error);
        setOptimisticTags(
          (currentTags) =>
            currentTags?.map((t) => (t._id === tag._id ? tag : t)) || []
        );
      }
      setEditingTag(null);
    },
    [editingTag, setOptimisticTags, mutate]
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
      setOptimisticTags(
        (currentTags) => currentTags?.filter((tag) => tag._id !== tagId) || []
      );

      try {
        await deleteTag(tagId);
        mutate();
      } catch (error) {
        console.error('Error deleting tag:', error);
        setOptimisticTags((currentTags) => [
          ...(currentTags || []),
          ...(tags?.filter((tag) => tag._id === tagId) || []),
        ]);
      }
    },
    [tags, setOptimisticTags, mutate]
  );

  if (isLoading) return <Spinner />;
  if (error) {
    console.error('Error fetching tags:', error);
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
            {optimisticTags && optimisticTags.length > 0 ? (
              optimisticTags.map((tag) => (
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
