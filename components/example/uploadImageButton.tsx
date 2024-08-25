"use client";
import React, { FormEvent, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import Image from "next/image";

type ImageType = "cover" | "timer";

interface ImageUploadState {
  file: File | null;
  previewUrl: string | null;
  isUploading: boolean;
  error: string | null;
}

export default function App() {
  const { userId } = useAuth();
  if (!userId) return (<div className="text-center py-4">Foto yuklemek icin giris yap kardes</div>);
  const generateUploadUrl = useMutation(api.image.generateUploadUrl);
  const sendCoverImage = useMutation(api.image.sendCoverImage);
  const sendTimerImage = useMutation(api.image.sendTimerImage);

  const [images, setImages] = useState<Record<ImageType, ImageUploadState>>({
    cover: { file: null, previewUrl: null, isUploading: false, error: null },
    timer: { file: null, previewUrl: null, isUploading: false, error: null },
  });

  const fileInputRefs = {
    cover: useRef<HTMLInputElement>(null),
    timer: useRef<HTMLInputElement>(null),
  };

  const isValidFileType = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
  };

  const handleImageSelect =
    (type: ImageType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (isValidFileType(file)) {
          setImages((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              file,
              previewUrl: URL.createObjectURL(file),
              error: null,
            },
          }));
        } else {
          setImages((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              error: "PNG files are not allowed. Please use JPEG, JPG, GIF, or WebP formats.",
            },
          }));
        }
      }
    };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-blue-500");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("border-blue-500");
  };

  const handleDrop =
    (type: ImageType) => (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.classList.remove("border-blue-500");
      const file = event.dataTransfer.files?.[0];
      if (file) {
        if (isValidFileType(file)) {
          setImages((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              file,
              previewUrl: URL.createObjectURL(file),
              error: null,
            },
          }));
        } else {
          setImages((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              error: "PNG files are not allowed. Please use JPEG, JPG, GIF, or WebP formats.",
            },
          }));
        }
      }
    };

  async function handleSendCoverImage() {
    await handleSendImage("cover", sendCoverImage);
  }

  async function handleSendTimerImage() {
    await handleSendImage("timer", sendTimerImage);
  }

  async function handleSendImage(
    type: ImageType,
    sendImageMutation: typeof sendCoverImage | typeof sendTimerImage
  ) {
    const imageState = images[type];
    if (!imageState.file) return;

    setImages((prev) => ({
      ...prev,
      [type]: { ...prev[type], isUploading: true, error: null },
    }));

    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": imageState.file.type },
        body: imageState.file,
      });
      const { storageId } = await result.json();
      await sendImageMutation({ storageId, clerkId: userId! });

      setImages((prev) => ({
        ...prev,
        [type]: {
          file: null,
          previewUrl: null,
          isUploading: false,
          error: null,
        },
      }));
      if (fileInputRefs[type].current) fileInputRefs[type].current.value = "";
    } catch (error) {
      console.error(`Upload error for ${type}:`, error);
      setImages((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          isUploading: false,
          error: "Upload failed. Please try again.",
        },
      }));
    }
  }

  const renderImageUploader = (type: ImageType) => {
    const { file, previewUrl, isUploading, error } = images[type];
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 capitalize">{type} Image</h3>
        <div
          className="mb-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-500"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop(type)}
          onClick={() => fileInputRefs[type].current?.click()}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={`${type} Preview`}
              width={200}
              height={150}
              layout="responsive"
              objectFit="contain"
            />
          ) : (
            <div className="text-gray-500">
              <ImageIcon className="mx-auto h-12 w-12 mb-2" />
              <p>Drag and drop {type} image here, or click to select</p>
              <p className="text-sm mt-2">(JPEG, JPG, GIF, or WebP only)</p>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/gif,image/webp"
            ref={fileInputRefs[type]}
            onChange={handleImageSelect(type)}
            className="hidden"
          />
        </div>
        <button
          onClick={
            type === "cover" ? handleSendCoverImage : handleSendTimerImage
          }
          disabled={!file || isUploading}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold flex items-center justify-center ${
            file && !isUploading
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          } transition duration-300`}
        >
          {isUploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="mr-2" size={20} />
              Send {type.charAt(0).toUpperCase() + type.slice(1)} Image
            </>
          )}
        </button>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Upload Images
      </h2>
      {renderImageUploader("cover")}
      {renderImageUploader("timer")}
    </div>
  );
}