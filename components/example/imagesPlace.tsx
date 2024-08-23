"use client"

import React from 'react';
import { useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';

function Image({ url }: { url: string | null }) {
  if (!url) {
    return <div className="text-gray-500 italic">No cover image available</div>;
  }
  return (
    <img 
      src={url} 
      height="300" 
      width="auto" 
      alt="Cover Photo" 
      className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    />
  );
}

export default function ConvexImageDisplay() {
  const { userId } = useAuth();
  const coverUrl = useQuery(api.imageList.getCoverImageUrl, { clerkId: userId! });
  const timerUrl = useQuery(api.imageList.getTimerImageUrl, { clerkId: userId! });
  

  if (coverUrl === undefined) {
    return <div className="text-center py-4">Loading cover image...</div>;
  }
  if (timerUrl === undefined) {
    return <div className="text-center py-4">Loading timer image...</div>;
  }
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Your Cover Photo</h2>
      <div className="border p-4 rounded-lg">
        <Image url={coverUrl} />
      </div>
      <h2 className="text-2xl font-bold mb-4">Your Timer Photo</h2>
      <div className="border p-4 rounded-lg">
        <Image url={timerUrl} />
      </div>
    </div>
  );
}