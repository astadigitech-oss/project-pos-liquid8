import React from "react";
import { Action } from "./action";
import { Content } from "./content";
import { AlertDialog } from "./_dialog/alert";
import { DraftTransaction } from "./_dialog/draft-list";
import { CheckoutDialog } from "./_dialog/checkout";

export const RightSection = () => {
  return (
    <div className="flex flex-col justify-between gap-4 h-full">
      <DraftTransaction />
      <AlertDialog />
      <CheckoutDialog />
      <div className="bg-gray-100 p-4 rounded-lg h-full">
        <Content />
      </div>
      <Action />
    </div>
  );
};
