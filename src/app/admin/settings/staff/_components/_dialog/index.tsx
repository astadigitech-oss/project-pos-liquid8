import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Atom, AtomValue } from "@suspensive/jotai";
import React from "react";
import { staffDialog } from "../../_api/atom";
import { detailStaffAtom } from "../../_api/queries";

import { AddEdit } from "./add-edit";
import { Password } from "./password";
import { cn } from "@/lib/utils";
import { Delete } from "./delete";

const headerDialog = {
  add: {
    title: "Tambah Staff",
    description: "Pastikan data yang anda masukan sesuai",
  },
  edit: {
    title: (name: string) => `Edit Staff ${name}`,
    description: (name: string) =>
      `Pastikan perubahan data untuk "${name}" sudah benar`,
  },
  password: {
    title: (name: string) => `Ubah Password ${name}`,
    description: (name: string) =>
      `Masukkan password baru untuk staff "${name}"`,
  },
  delete: {
    title: (name: string) => `Hapus Staff ${name}`,
    description: (name: string) => `Yakin ingin menghapus staff "${name}"?`,
  },
  "": {
    title: "",
    description: "",
  },
};

export const StaffDialog = () => {
  return (
    <AtomValue atom={detailStaffAtom}>
      {({ data, isRefetching, isSuccess }) => (
        <Atom atom={staffDialog}>
          {([open, setOpen]) => {
            const title =
              typeof headerDialog[open]?.title === "function"
                ? headerDialog[open].title(
                    !isRefetching && isSuccess ? data?.data.resource.Name : "",
                  )
                : headerDialog[open]?.title;
            const description =
              typeof headerDialog[open]?.description === "function"
                ? headerDialog[open].description(
                    !isRefetching && isSuccess ? data?.data.resource.Name : "",
                  )
                : headerDialog[open]?.description;
            return (
              <Dialog
                open={!!open}
                onOpenChange={(e) => {
                  if (!e) {
                    setOpen("");
                  }
                }}
              >
                <DialogContent
                  showCloseButton={false}
                  className={cn(
                    open === "add" || open === "edit"
                      ? "min-w-2xl"
                      : "min-w-xs",
                  )}
                >
                  <DialogHeader>
                    <DialogTitle className={"capitalize"}>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                  </DialogHeader>
                  {(open === "add" || open === "edit") && <AddEdit />}
                  {open === "password" && <Password />}
                  {open === "delete" && <Delete />}
                </DialogContent>
              </Dialog>
            );
          }}
        </Atom>
      )}
    </AtomValue>
  );
};
