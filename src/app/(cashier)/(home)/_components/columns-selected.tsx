import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldLabel,
} from "@/components/ui/number-input";
import { formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Send, Trash, XIcon } from "lucide-react";

export const columnSelected = (): ColumnDef<{
  name: string;
  qty: number;
  type: string;
  price: number;
}>[] => [
  {
    header: () => <div className="text-center">No</div>,
    id: "id",
    cell: ({ row }) => (
      <div className="text-center tabular-nums">
        {(1 + row.index).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "qty",
    header: "Qty",
  },
  {
    accessorKey: "type",
    header: "Tipe",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {row.original.type === "sku" ? (
            <Dialog>
              <TooltipText
                value={"Edit Qty"}
                render={
                  <DialogTrigger
                    render={
                      <Button
                        size={"icon-xs"}
                        className={"hover:bg-gray-200"}
                        variant={"ghost"}
                      >
                        <Edit2 />
                      </Button>
                    }
                  />
                }
              />
              <DialogContent showCloseButton={false}>
                <DialogHeader>
                  <DialogTitle>Edit Qty</DialogTitle>
                  <DialogDescription>
                    Sesuaikan kuantitas produk terpilih
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <NumberField defaultValue={0}>
                    <NumberFieldLabel>Qty</NumberFieldLabel>
                    <NumberFieldContent className={"h-10"} />
                  </NumberField>
                </div>
                <DialogFooter>
                  <DialogClose
                    render={
                      <Button variant={"outline"}>
                        <XIcon className="size-3.5" />
                        Tutup
                      </Button>
                    }
                  />
                  <Button>
                    <Send className="size-3.5" />
                    Update
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <span className="size-6 border border-transparent" />
          )}
          <TooltipText
            value={"Hapus Produk"}
            render={
              <Button
                size={"icon-xs"}
                className={"text-red-500 hover:text-red-500 hover:bg-red-100"}
                variant={"ghost"}
              >
                <Trash />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
