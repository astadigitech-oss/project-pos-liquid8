import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Atom } from "@suspensive/jotai";
import { detailShiftDialog } from "../../_api/atom";

export const ShiftDetailDialog = () => {
  return (
    <Atom atom={detailShiftDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-xl"}>
            <div className="flex flex-col h-[90svh] w-full justify-between">
              <DialogHeader>
                <DialogTitle>Detail Shift</DialogTitle>
                <DialogDescription>
                  Seluruh detail shift dari item sampai rangkuman
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={
                    <Button variant={"outline"}>
                      <XIcon className="size-3.5" />
                      Tutup
                    </Button>
                  }
                />
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};
