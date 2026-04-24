import React from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { SetStateAction, useAtom, WritableAtom } from "jotai";

export const Pagination = ({
  atomPage,
  pagination,
  isPending,
}: {
  atomPage: WritableAtom<number, [SetStateAction<number>], void>;
  isPending: boolean;
  pagination?: {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
  };
}) => {
  const [page, setPage] = useAtom(atomPage);

  const actualLastPage =
    pagination?.last_page === 0 ? page : (pagination?.last_page ?? 1);

  React.useEffect(() => {
    if (pagination && pagination.current_page > actualLastPage) {
      setPage(1);
    }
  }, [pagination, setPage, actualLastPage]);
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
      <div className="flex items-center gap-1">
        <Button
          variant={"diskonter"}
          size={"icon-sm"}
          onClick={() => setPage(1)}
          disabled={page === 1 || isPending}
        >
          <ChevronsLeft className="size-3.5" />
        </Button>
        <Button
          variant={"diskonter"}
          size={"icon-sm"}
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || isPending}
        >
          <ChevronLeft className="size-3.5" />
        </Button>
        <p className="mx-2 text-xs font-medium">
          Halaman {pagination?.current_page.toLocaleString()} dari{" "}
          {actualLastPage.toLocaleString()}
        </p>
        <Button
          variant={"diskonter"}
          size={"icon-sm"}
          onClick={() => setPage(page + 1)}
          disabled={page === actualLastPage || isPending}
        >
          <ChevronRight className="size-3.5" />
        </Button>
        <Button
          variant={"diskonter"}
          size={"icon-sm"}
          onClick={() => setPage(actualLastPage ?? 1)}
          disabled={page === actualLastPage || isPending}
        >
          <ChevronsRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};
