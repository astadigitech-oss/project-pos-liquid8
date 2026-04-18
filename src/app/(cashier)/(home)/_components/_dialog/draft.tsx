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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, XIcon } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { columnDraf } from "../columns-draf";
import { Button } from "@/components/ui/button";
import { Atom, AtomValue } from "@suspensive/jotai";
import { listPendingAtom } from "../../_api/queries";
import { draftDialog } from "../../_api/atoms";

export const DraftTransaction = () => {
  return (
    <Atom atom={draftDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-xl"}>
            <DialogHeader>
              <DialogTitle>Draf Transaksi</DialogTitle>
              <DialogDescription>
                List transaksi customer yang tertunda
              </DialogDescription>
            </DialogHeader>
            <AtomValue atom={listPendingAtom}>
              {({ data }) => (
                <div className="flex flex-col gap-4">
                  <InputGroup>
                    <InputGroupInput placeholder="Cari draf..." />
                    <InputGroupAddon>
                      <SearchIcon className="size-3.5" />
                    </InputGroupAddon>
                  </InputGroup>
                  <DataTable
                    columns={columnDraf()}
                    data={data?.resource ?? []}
                  />
                </div>
              )}
            </AtomValue>
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
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};
