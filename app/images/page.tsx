import React from "react";
import ImagePlaces from "@/components/example/imagesPlace";
import UploadImageButton from "@/components/example/uploadImageButton";

const ImagePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Image Gallery</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
        <UploadImageButton />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Images</h2>
        <ImagePlaces />
      </div>
    </div>
  );
};

export default ImagePage;