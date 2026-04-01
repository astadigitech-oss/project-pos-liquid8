import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Edit2, Trash } from "lucide-react";

export const column = (): ColumnDef<{ name: string; phone: string }>[] => [
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
    accessorKey: "phone",
    header: "No. Hp.",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center gap-1">
          <Button size={"icon-sm"}>
            <Check className="size-3.5" />
          </Button>
          <Button size={"icon-sm"}>
            <Edit2 className="size-3.5" />
          </Button>
          <Button size={"icon-sm"}>
            <Trash className="size-3.5" />
          </Button>
        </div>
      );
    },
  },
];
