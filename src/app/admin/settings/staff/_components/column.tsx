import { Button } from "@/components/ui/button";
import { TooltipText } from "@/providers/tooltip-provider";
import { SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, ShieldCheck, Trash } from "lucide-react";
import { staffDialog, selectedStaffId } from "../_api/atom";
import { Spinner } from "@/components/ui/spinner";

export const column = ({
  from,
  disabledEdit,
}: {
  from: number;
  disabledEdit: boolean;
}): ColumnDef<{
  id: number;
  name: string;
  username: string;
  email: string;
  store_name: string;
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "store_name",
    header: "Toko",
    cell: ({ row }) =>
      row.original.store_name ? row.original.store_name : "-",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <SetAtom atom={selectedStaffId}>
          {(setSelectedId) => (
            <SetAtom atom={staffDialog}>
              {(setOpen) => (
                <div className="flex items-center gap-1">
                  <TooltipText
                    value="Edit Staff"
                    render={
                      <Button
                        size={"icon-sm"}
                        className={
                          "text-yellow-600 bg-yellow-100 hover:bg-yellow-200 hover:text-yellow-700"
                        }
                        variant={"ghost"}
                        disabled={disabledEdit}
                        onClick={() => {
                          setSelectedId(row.original.id.toString());
                          setOpen("edit");
                        }}
                      >
                        {disabledEdit ? (
                          <Spinner className="size-3.5" />
                        ) : (
                          <Edit2 className="size-3.5" />
                        )}
                      </Button>
                    }
                  />
                  <TooltipText
                    value={"Ganti Password Staff"}
                    render={
                      <Button
                        size={"icon-sm"}
                        className={
                          "text-blue-600 bg-blue-100 hover:bg-blue-200 hover:text-blue-700"
                        }
                        variant={"ghost"}
                        onClick={() => {
                          setSelectedId(row.original.id.toString());
                          setOpen("password");
                        }}
                      >
                        <ShieldCheck className="size-3.5" />
                      </Button>
                    }
                  />
                  <TooltipText
                    value={"Hapus Staff"}
                    render={
                      <Button
                        size={"icon-sm"}
                        variant={"destructive"}
                        onClick={() => {
                          setSelectedId(row.original.id.toString());
                          setOpen("delete");
                        }}
                      >
                        <Trash className="size-3.5" />
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
