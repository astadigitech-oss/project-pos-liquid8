"use client";

import React from "react";
import { ShiftDialog } from "./_dialog/shift";
import { LeftSection } from "./_sections/left";
import { TopSection } from "./_sections/top";
import { RightSection } from "./_sections/right";

export const HomeClient = () => {
  return (
    <div className="flex flex-col gap-4">
      <TopSection />
      <ShiftDialog />
      <div className="grid grid-cols-5 bg-white rounded-xl shadow p-4 gap-4 h-[calc(100svh-32px-40px-16px)]">
        <div className="col-span-3 size-full">
          <LeftSection />
        </div>
        <div className="col-span-2 size-full">
          <RightSection />
        </div>
      </div>
    </div>
  );
};
