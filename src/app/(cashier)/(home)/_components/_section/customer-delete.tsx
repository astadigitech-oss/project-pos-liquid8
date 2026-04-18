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
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { customerId, isCustomer } from "../../_api/atoms";
import { deleteMemberAtom } from "../../_api/mutation";
import { Spinner } from "@/components/ui/spinner";

export const CustomerDelete = () => {
  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <AtomValue atom={detailMemberAtom}>
          {({ data: detail }) => (
            <DialogTitle>Hapus Customer {detail?.resource.name}</DialogTitle>
          )}
        </AtomValue>
        <DialogDescription>
          Apakah anda yakin? tindakan ini bersifat permanen
        </DialogDescription>
      </DialogHeader>

      <SetAtom atom={isCustomer}>
        {(setIsCustomer) => (
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsCustomer("")}
            >
              <XIcon className="size-3.5" />
              Batal
            </Button>
            <AtomValue atom={customerId}>
              {(idCustomer) => (
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
            </AtomValue>
          </DialogFooter>
        )}
      </SetAtom>
    </div>
  );
};
