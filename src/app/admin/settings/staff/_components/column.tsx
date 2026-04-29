import { Button } from "@/components/ui/button";
import { cn, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ReceiptText, TicketX } from "lucide-react";

export const column = ({
  from,
}: {
  from: number;
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
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <TooltipText
            value="Detail Transaksi"
            render={
              <Button
                size={"icon-sm"}
                className={
                  "text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600"
                }
                variant={"ghost"}
              >
                <ReceiptText className="size-3.5" />
              </Button>
            }
          />
          <TooltipText
            value={"Batalkan Transaksi"}
            render={
              <Button size={"icon-sm"} variant={"destructive"}>
                <TicketX className="size-3.5" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
