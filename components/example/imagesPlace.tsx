"use client"

import React from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import { Trash2 } from 'lucide-react';

interface ImageProps {
  url: string | null;
  onDelete: () => Promise<void>;
  type: 'cover' | 'timer';
}

function Image({ url, onDelete, type }: ImageProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error(`Failed to delete ${type} image:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!url) {
    return (
      <div className="flex justify-between items-center">
        <div className="text-gray-500 italic">No {type} image available</div>
        <button 
          className="text-red-500 hover:text-red-700 disabled:text-gray-400" 
          disabled={true}
        >
          <Trash2 size={20} />
        </button>
      </div>
    );
  }
  return (
    <div className="relative group">
      <img 
        src={url} 
        height="300" 
        width="auto" 
        alt={`${type.charAt(0).toUpperCase() + type.slice(1)} Photo`}
        className="rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
      />
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:bg-gray-400"
      >
        <Trash2 size={20} />
      </button>
      {isDeleting && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="text-white">Deleting...</div>
        </div>
      )}
    </div>
  );
}

export default function ConvexImageDisplay() {
  const { userId } = useAuth();
  if(!userId) return (<div className="text-center py-4">Fotolari gormek icin giris yap kardes</div>);
  const coverUrl = useQuery(api.image.imageList.getCoverImageUrl, { clerkId: userId as string });
  const timerUrl = useQuery(api.image.imageList.getTimerImageUrl, { clerkId: userId as string });
  const deleteCoverImage = useMutation(api.image.image.deleteCoverImage);
  const deleteTimerImage = useMutation(api.image.image.deleteTimerImage);

  const handleDeleteCover = async () => {
    if (userId) {
      await deleteCoverImage({ clerkId: userId });
    }
  };

  const handleDeleteTimer = async () => {
    if (userId) {
      await deleteTimerImage({ clerkId: userId });
    }
  };

  if (coverUrl === undefined || timerUrl === undefined) {
    return <div className="text-center py-4">Loading images...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Your Cover Photo</h2>
      <div className="border p-4 rounded-lg">
        <Image url={coverUrl} onDelete={handleDeleteCover} type="cover" />
      </div>
      <h2 className="text-2xl font-bold my-4">Your Timer Photo</h2>
      <div className="border p-4 rounded-lg">
        <Image url={timerUrl} onDelete={handleDeleteTimer} type="timer" />
      </div>
    </div>
  );
}