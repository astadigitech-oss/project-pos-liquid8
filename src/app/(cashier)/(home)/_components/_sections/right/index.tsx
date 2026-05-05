import React from "react";
import { Action } from "./action";
import { Content } from "./content";
import { CheckoutTransaction } from "../../_dialog/checkout";
import { AlertDialog } from "./_dialog/alert";
import { PaymentMethodDialog } from "./_dialog/payment-method";
import { DraftTransaction } from "./_dialog/draft-list";

export const RightSection = () => {
  return (
    <div className="flex flex-col justify-between gap-4 h-full">
      <DraftTransaction />
      <CheckoutTransaction />
      <PaymentMethodDialog />
      <AlertDialog />
      <div className="bg-gray-100 p-4 rounded-lg h-full">
        <Content />
      </div>
      <Action />
    </div>
  );
};
