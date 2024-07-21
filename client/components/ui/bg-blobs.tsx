import React from "react";

const BgBlob = () => {
  return (
    <>
      <div className="absolute -top-10 -left-24 blur-3xl">
        <div className="w-96 h-96 rounded-full bg-primary-500 bg-opacity-10" />
      </div>
      <div className="absolute bottom-10 right-7 blur-3xl">
        <div className="w-96 h-52 rounded-full bg-primary-500 bg-opacity-10" />
      </div>
    </>
  );
};

export default BgBlob;
