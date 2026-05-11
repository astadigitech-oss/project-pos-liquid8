import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { ArrowLeft, Check, XIcon } from "lucide-react";
import React from "react";
import { approvedTransactionAdminDialog } from "../../_api/atom";

export const AlertDialog = () => {
  const [open, setOpen] = useAtom(approvedTransactionAdminDialog);
  return (
    <Dialog
      open={!!open}
      onOpenChange={(e) => {
        if (!e) {
          setOpen("");
        }
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembatalan Transaksi</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin membatalkan transaksi ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <DialogClose
              render={
                <Button variant={"outline"}>
                  <ArrowLeft className="size-3.5" />
                  Tutup
                </Button>
              }
            />
            <div className="flex items-center gap-2">
              <Button variant="outlineDestructive">
                <XIcon className="size-3.5" />
                Tolak
              </Button>
              <Button>
                <Check className="size-3.5" />
                Setuju
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
