import { Button } from "@/components/ui/button";
import { formatRupiah, invalidate } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { Play, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import {
  deleteDraftAtom,
  resumeDraftAtom,
} from "@/app/(cashier)/(home)/_api/mutation";
import {
  cashierDialog,
  customerSelectedId,
} from "@/app/(cashier)/(home)/_api/atoms";

export const columnDraft = ({
  from,
}: {
  from: number;
}): ColumnDef<{
  customer_name: string;
  keep_code: string;
  item_count: number;
  total: number;
}>[] => [
  {
    header: () => <div className="text-center">No</div>,
    id: "id",
    cell: ({ row }) => (
      <div className="text-center tabular-nums">
        {(from + row.index).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "keep_code",
    header: "Kode",
  },
  {
    accessorKey: "customer_name",
    header: "Nama",
  },
  {
    accessorKey: "item_count",
    header: "Item",
    cell: ({ row }) => row.original.item_count.toLocaleString(),
  },
  {
    accessorKey: "price",
    header: "Total Harga",
    cell: ({ row }) => formatRupiah(row.original.total),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <AtomValue atom={resumeDraftAtom}>
          {({ mutate: resume, isPending: isResuming }) => (
            <AtomValue atom={deleteDraftAtom}>
              {({ mutate: deleteDraft, isPending: isDeleting }) => {
                const queryClient = useQueryClient();
                const isLoading = isResuming || isDeleting;
                return (
                  <div className="flex items-center gap-1">
                    <SetAtom atom={cashierDialog}>
                      {(setOpen) => (
                        <SetAtom atom={customerSelectedId}>
                          {(setCustomerId) => (
                            <TooltipText
                              value="Lanjutkan Transaksi"
                              render={
                                <Button
                                  size={"icon-sm"}
                                  variant={"secondary"}
                                  className={"hover:bg-gray-200"}
                                  onClick={() =>
                                    resume(row.original.keep_code, {
                                      onSuccess: async (data) => {
                                        setOpen("");
                                        setCustomerId(
                                          data.resource[0].member_id.toString(),
                                        );
                                        await invalidate(queryClient, [
                                          "list-pending",
                                        ]);
                                        await invalidate(queryClient, [
                                          "current-cart",
                                        ]);
                                      },
                                    })
                                  }
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <Spinner className="size-3.5" />
                                  ) : (
                                    <Play className="size-3.5" />
                                  )}
                                </Button>
                              }
                            />
                          )}
                        </SetAtom>
                      )}
                    </SetAtom>
                    <TooltipText
                      value="Hapus Transaksi"
                      render={
                        <Button
                          size={"icon-sm"}
                          variant={"destructive"}
                          disabled={isLoading}
                          onClick={() =>
                            deleteDraft(row.original.keep_code, {
                              onSuccess: async () => {
                                await invalidate(queryClient, ["list-pending"]);
                              },
                            })
                          }
                        >
                          {isLoading ? (
                            <Spinner className="size-3.5" />
                          ) : (
                            <Trash className="size-3.5" />
                          )}
                        </Button>
                      }
                    />
                  </div>
                );
              }}
            </AtomValue>
          )}
        </AtomValue>
      );
    },
  },
];
