import React from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Atom } from "@suspensive/jotai";
import { SetStateAction, WritableAtom } from "jotai";

export const Pagination = ({
  atomPage,
  pagination,
  isPending,
}: {
  atomPage: WritableAtom<number, [SetStateAction<number>], void>;
  isPending: boolean;
  pagination?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <p className="text-xs font-medium">
          Total {pagination?.total.toLocaleString()} data
        </p>
        <p>|</p>
        <p className="text-xs font-medium">
          {pagination?.per_page.toLocaleString()} per halaman
        </p>
      </div>
      <Atom atom={atomPage}>
        {([page, setPage]) => (
          <div className="flex items-center gap-1">
            <Button
              size={"icon-sm"}
              onClick={() => setPage(1)}
              disabled={page === 1 || isPending}
            >
              <ChevronsLeft className="size-3.5" />
            </Button>
            <Button
              size={"icon-sm"}
              onClick={() => setPage((page = page - 1))}
              disabled={page === 1 || isPending}
            >
              <ChevronLeft className="size-3.5" />
            </Button>
            <p className="mx-2 text-xs font-medium">
              Halaman {pagination?.current_page.toLocaleString()} dari{" "}
              {pagination?.last_page.toLocaleString()}
            </p>
            <Button
              size={"icon-sm"}
              onClick={() => setPage((page = page + 1))}
              disabled={page === pagination?.last_page || isPending}
            >
              <ChevronRight className="size-3.5" />
            </Button>
            <Button
              size={"icon-sm"}
              onClick={() => setPage(pagination?.last_page ?? 1)}
              disabled={page === pagination?.last_page || isPending}
            >
              <ChevronsRight className="size-3.5" />
            </Button>
          </div>
        )}
      </Atom>
    </div>
  );
};
