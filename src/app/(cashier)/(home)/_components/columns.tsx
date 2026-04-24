import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Edit2, Trash } from "lucide-react";
import {
  customerDialog,
  customerId,
  customerSelectedId,
  isCustomer,
} from "../_api/atoms";

export const column = ({
  from,
}: {
  from: number;
}): ColumnDef<{ id: number; name: string; phone: string }>[] => [
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
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "phone",
    header: "No. Hp.",
    cell: ({ row }) => formatPhoneNumber(row.original.phone),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <SetAtom atom={isCustomer}>
          {(setIsCustomer) => (
            <SetAtom atom={customerId}>
              {(setCustomerId) => (
                <div className="flex items-center gap-2">
                  <SetAtom atom={customerDialog}>
                    {(setOpen) => (
                      <SetAtom atom={customerSelectedId}>
                        {(setSelectedCustomer) => (
                          <TooltipText
                            value={"Pilih Customer"}
                            render={
                              <Button
                                size={"icon-xs"}
                                className={"hover:bg-gray-200"}
                                variant={"outline"}
                                onClick={() => {
                                  setSelectedCustomer(
                                    row.original.id.toString(),
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check />
                              </Button>
                            }
                          />
                        )}
                      </SetAtom>
                    )}
                  </SetAtom>
                  <TooltipText
                    value={"Edit Customer"}
                    render={
                      <Button
                        size={"icon-xs"}
                        variant={"outlineWarning"}
                        onClick={() => {
                          setCustomerId(row.original.id.toString());
                          setIsCustomer("edit");
                        }}
                      >
                        <Edit2 />
                      </Button>
                    }
                  />
                  <TooltipText
                    value={"Hapus Customer"}
                    render={
                      <Button
                        size={"icon-xs"}
                        variant={"outlineDestructive"}
                        onClick={() => {
                          setCustomerId(row.original.id.toString());
                          setIsCustomer("delete");
                        }}
                      >
                        <Trash />
                      </Button>
                    }
                  />
                </div>
              )}
            </SetAtom>
          )}
        </SetAtom>
      );
    },
  },
];
