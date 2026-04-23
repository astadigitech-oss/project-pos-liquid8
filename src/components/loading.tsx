import React from "react";

export const LoadingComponent = () => {
  return (
    <div className="w-full h-svh flex items-center flex-col gap-3 justify-center bg-gray-100">
      <div className="loader-filter size-20 flex items-center justify-center mix-blend-darken relative">
        <div className="size-10 grid grid-cols-1 grid-rows-1">
          <div className="animate-gooey col-start-1 row-start-1 size-7 bg-red-500"></div>
          <div className="animate-gooey-delayed col-start-1 row-start-1 size-7 bg-red-500"></div>
        </div>
      </div>
      <p className="text-shadow-sm font-semibold">Memuat Halaman...</p>
    </div>
  );
};
