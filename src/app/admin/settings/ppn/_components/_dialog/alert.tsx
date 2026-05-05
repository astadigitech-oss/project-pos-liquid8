import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Atom, AtomValue } from "@suspensive/jotai";
import React from "react";
import { alertPpnDialog, selectedDialogId } from "../../_api/atom";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { deletePpnAtom, updatePpnAtom } from "../../_api/mutations";
import { detailPPNAtom } from "../../_api/queries";
import { cn, invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Delay } from "@suspensive/react";

export const AlertPPNDialog = () => {
  const queryClient = useQueryClient();
  return (
    <Atom atom={alertPpnDialog}>
      {([open, setOpen]) => (
        <Atom atom={selectedDialogId}>
          {([selectedId, setSelectedId]) => (
            <AtomValue atom={detailPPNAtom}>
              {({ data, isLoading }) => (
                <Dialog
                  open={!!open}
                  onOpenChange={(e) => {
                    if (!e) {
                      setOpen("");
                      setSelectedId("");
                    }
                  }}
                >
                  <DialogContent showCloseButton={false}>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <Delay ms={500} fallback={<Loader />}>
                        <div className="flex flex-col gap-4">
                          <DialogHeader className={cn(isLoading && "sr-only")}>
                            <DialogTitle>
                              {open === "activate"
                                ? "Aktifkan PPN"
                                : "Hapus PPN"}
                            </DialogTitle>
                            <DialogDescription>
                              Apakah Anda yakin ingin{" "}
                              {open === "activate"
                                ? "mengaktifkan"
                                : "menghapus"}{" "}
                              PPN {data?.data.ppn}%?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose
                              render={
                                <Button variant={"outline"}>
                                  <X className="size-3.5" />
                                  Batal
                                </Button>
                              }
                            />
                            <AtomValue atom={deletePpnAtom}>
                              {({ mutate: deletePPn }) => (
                                <AtomValue atom={updatePpnAtom}>
                                  {({ mutate: activatePpn }) => (
                                    <Button
                                      onClick={() => {
                                        if (open === "activate")
                                          return activatePpn(
                                            {
                                              id: Number.parseFloat(selectedId),
                                              body: {
                                                is_tax_default: true,
                                                ppn: data?.data.ppn ?? 0,
                                              },
                                            },
                                            {
                                              onSuccess: async () => {
                                                setOpen("");
                                                setSelectedId("");
                                                await invalidate(queryClient, [
                                                  "list-ppn",
                                                ]);
                                              },
                                            },
                                          );

                                        return deletePPn(
                                          {
                                            id: Number.parseFloat(selectedId),
                                          },
                                          {
                                            onSuccess: async () => {
                                              setOpen("");
                                              setSelectedId("");
                                              await invalidate(queryClient, [
                                                "list-ppn",
                                              ]);
                                            },
                                          },
                                        );
                                      }}
                                    >
                                      <Send className="size-3.5" />
                                      {"Konfirmasi"}
                                    </Button>
                                  )}
                                </AtomValue>
                              )}
                            </AtomValue>
                          </DialogFooter>
                        </div>
                      </Delay>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </AtomValue>
          )}
        </Atom>
      )}
    </Atom>
  );
};

const Loader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-9.5 flex items-center gap-2">
        <Spinner />
        Memuat data...
      </div>
      <div
        data-slot="dialog-footer"
        className="-mx-4 -mb-4 h-16.2 flex justify-end items-center rounded-b-xl border-t bg-muted/50 p-4"
      >
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-19 bg-gray-300" />
          <Skeleton className="h-8 w-19 bg-gray-300" />
        </div>
      </div>
    </div>
  );
};
