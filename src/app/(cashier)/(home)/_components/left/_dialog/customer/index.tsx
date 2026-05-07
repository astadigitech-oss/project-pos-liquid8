import { Atom } from "@suspensive/jotai";
import React from "react";
import { cashierDialog } from "../../../../_api/atoms";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CustomerList } from "./customer-list";
import { CustomerAdd } from "./customer-add";
import { CustomerDelete } from "./customer-delete";
import { cn } from "@/lib/utils";

export const CustomerDialog = () => {
  return (
    <Atom atom={cashierDialog}>
      {([open, setOpen]) => (
        <Dialog
          open={
            !!open &&
            (open === "customer-list" ||
              open === "customer-add" ||
              open === "customer-edit" ||
              open === "customer-delete")
          }
          onOpenChange={(e) => {
            if (!e) {
              setOpen("");
            }
          }}
        >
          <DialogContent
            showCloseButton={false}
            className={cn(
              "min-w-2xl",
              (open === "customer-add" ||
                open === "customer-edit" ||
                open === "customer-delete") &&
                "min-w-md",
            )}
          >
            {open === "customer-add" || open === "customer-edit" ? (
              <CustomerAdd />
            ) : open === "customer-delete" ? (
              <CustomerDelete />
            ) : (
              <CustomerList />
            )}
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};
