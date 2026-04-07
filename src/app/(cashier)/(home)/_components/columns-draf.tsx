import { Button } from "@/components/ui/button";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Play, Trash } from "lucide-react";

export const columnDraf = (): ColumnDef<{
  name: string;
  phone: string;
  date: Date;
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
    accessorKey: "phone",
    header: "No. Hp.",
  },
  {
    accessorKey: "date",
    header: "Tanggal Draf",
    cell: ({ row }) =>
      format(row.original.date, "dd/MM/yyyy - HH:mm", {
        locale: id,
        in: tz("Asia/Jakarta"),
      }),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center gap-1">
          <TooltipText
            value="Lanjutkan Transaksi"
            render={
              <Button
                size={"icon-sm"}
                variant={"secondary"}
                className={"hover:bg-gray-200"}
              >
                <Play className="size-3.5" />
              </Button>
            }
          />
          <TooltipText
            value="Hapus Transaksi"
            render={
              <Button size={"icon-sm"} variant={"destructive"}>
                <Trash className="size-3.5" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
