"use client";

import React from "react";
import { LeftSection } from "./left";
import { TopSection } from "./top";
import { RightSection } from "./right";

export const HomeClient = () => {
  return (
    <div className="flex flex-col gap-4">
      <TopSection />
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
