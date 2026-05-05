import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Edit2, XIcon } from "lucide-react";
import {
  alertPpnDialog,
  addEditPpnDialog,
  selectedDialogId,
} from "../_api/atom";

export const column = (): ColumnDef<{
  id: number;
  ppn: number;
  is_tax_default: boolean;
  created_at: string;
  updated_at: string;
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
    accessorKey: "ppn",
    header: "PPN",
    cell: ({ row }) => row.original.ppn.toLocaleString() + "%",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 border rounded-full w-fit px-2 py-0.5 border-gray-300">
          <span
            className={cn(
              "size-2 rounded-full",
              row.original.is_tax_default ? "bg-green-500" : "bg-red-500",
            )}
          />
          {row.original.is_tax_default ? "Aktif" : "Non-Aktif"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <SetAtom atom={selectedDialogId}>
          {(setSelectedId) => (
            <SetAtom atom={alertPpnDialog}>
              {(setOpen) => (
                <div className="flex items-center gap-1">
                  <TooltipText
                    value="Aktifkan PPN"
                    render={
                      <Button
                        size={"icon-sm"}
                        disabled={row.original.is_tax_default}
                        className={
                          "text-green-700 bg-green-100 hover:bg-green-200 hover:text-green-700"
                        }
                        variant={"ghost"}
                        onClick={() => {
                          setOpen("activate");
                          setSelectedId(row.original.id.toString());
                        }}
                      >
                        <Check className="size-3.5" />
                      </Button>
                    }
                  />
                  <SetAtom atom={addEditPpnDialog}>
                    {(setOpen) => (
                      <TooltipText
                        value="Edit PPN"
                        render={
                          <Button
                            size={"icon-sm"}
                            className={
                              "text-yellow-700 bg-yellow-100 hover:bg-yellow-200 hover:text-yellow-700"
                            }
                            variant={"ghost"}
                            onClick={() => {
                              setOpen("edit");
                              setSelectedId(row.original.id.toString());
                            }}
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                        }
                      />
                    )}
                  </SetAtom>
                  <TooltipText
                    value="Hapus PPN"
                    render={
                      <Button
                        size={"icon-sm"}
                        className={
                          "text-red-700 bg-red-100 hover:bg-red-200 hover:text-red-700"
                        }
                        variant={"ghost"}
                        onClick={() => {
                          setOpen("delete");
                          setSelectedId(row.original.id.toString());
                        }}
                      >
                        <XIcon className="size-3.5" />
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
