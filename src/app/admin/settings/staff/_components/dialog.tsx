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
import { addEditStaffDialog } from "../_api/atom";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { detailStaffAtom } from "../_api/queries";

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
      {({ data }) => (
        <Atom atom={addEditStaffDialog}>
          {([open, setOpen]) => {
            const title =
              typeof headerDialog[open]?.title === "function"
                ? headerDialog[open].title("name")
                : headerDialog[open]?.title;
            const description =
              typeof headerDialog[open]?.description === "function"
                ? headerDialog[open].description("name")
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
                <DialogContent showCloseButton={false}>
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                  </DialogHeader>
                  {open !== "delete" && (
                    <form>
                      <DialogFooter>
                        <DialogClose
                          render={
                            <Button variant={"outline"}>
                              <X className="size-3.5" />
                              Batal
                            </Button>
                          }
                        />
                        <Button>
                          <Send className="size-3.5" />
                          Kirim
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                  {open === "delete" && (
                    <DialogFooter>
                      <DialogClose
                        render={
                          <Button variant={"outline"}>
                            <X className="size-3.5" />
                            Batal
                          </Button>
                        }
                      />
                      <Button>
                        <Send className="size-3.5" />
                        Kirim
                      </Button>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>
            );
          }}
        </Atom>
      )}
    </AtomValue>
  );
};
