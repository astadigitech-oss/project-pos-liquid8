import { Atom, AtomValue } from "@suspensive/jotai";
import React from "react";
import { customerDialog, isCustomer } from "../../_api/atoms";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CustomerList } from "../_section/customer-list";
import { CustomerAdd } from "../_section/customer-add";
import { CustomerDelete } from "../_section/customer-delete";
import { cn } from "@/lib/utils";

export const CustomerDialog = () => {
  return (
    <Atom atom={customerDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <AtomValue atom={isCustomer}>
            {(isAdd) => (
              <DialogContent
                showCloseButton={false}
                className={cn(
                  "min-w-2xl",
                  (isAdd === "add" || isAdd === "edit" || isAdd === "delete") &&
                    "min-w-md",
                )}
              >
                {isAdd === "add" || isAdd === "edit" ? (
                  <CustomerAdd />
                ) : isAdd === "delete" ? (
                  <CustomerDelete />
                ) : (
                  <CustomerList />
                )}
              </DialogContent>
            )}
          </AtomValue>
        </Dialog>
      )}
    </Atom>
  );
};
