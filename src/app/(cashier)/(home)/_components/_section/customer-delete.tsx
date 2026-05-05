import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { detailMemberAtom } from "../../_api/queries";
import { Atom, AtomValue, SetAtom } from "@suspensive/jotai";
import { cashierDialog, customerId } from "../../_api/atoms";
import { deleteMemberAtom } from "../../_api/mutation";
import { Spinner } from "@/components/ui/spinner";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export const CustomerDelete = () => {
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <AtomValue atom={detailMemberAtom}>
          {({ data: detail }) => (
            <DialogTitle>Hapus Customer {detail?.resource?.name}</DialogTitle>
          )}
        </AtomValue>
        <DialogDescription>
          Apakah anda yakin? tindakan ini bersifat permanen
        </DialogDescription>
      </DialogHeader>

      <SetAtom atom={cashierDialog}>
        {(setDialog) => (
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setDialog("customer-list")}
            >
              <XIcon className="size-3.5" />
              Batal
            </Button>
            <Atom atom={customerId}>
              {([idCustomer, setIdCustomer]) => (
                <AtomValue atom={deleteMemberAtom}>
                  {({ mutate: deleteMember, isPending: isDeleting }) => (
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() =>
                        deleteMember(
                          { id: idCustomer },
                          {
                            onSuccess: async () => {
                              setDialog("customer-list");
                              setIdCustomer("");
                              await invalidate(queryClient, ["list-member"]);
                            },
                          },
                        )
                      }
                    >
                      {isDeleting ? (
                        <Spinner className="size-3.5" />
                      ) : (
                        <Trash className="size-3.5" />
                      )}
                      {isDeleting ? "Menghapus..." : "Hapus"}
                    </Button>
                  )}
                </AtomValue>
              )}
            </Atom>
          </DialogFooter>
        )}
      </SetAtom>
    </div>
  );
};
