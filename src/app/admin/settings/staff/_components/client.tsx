"use client";

import { DataTable } from "@/components/data-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import React from "react";
import { column } from "./column";
import { Pagination } from "@/components/pagination";
import { staffPage } from "../_api/atom";
import { AtomValue } from "@suspensive/jotai";
import { listStaffAtom } from "../_api/queries";
import { StaffDialog } from "./dialog";

export const StaffSettingClient = () => {
  return (
    <AtomValue atom={listStaffAtom}>
      {({ data }) => (
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-6">
          <StaffDialog />
          <div className="flex items-center justify-between">
            <h2 className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
              Staff
            </h2>
            <div>
              <InputGroup>
                <InputGroupInput />
                <InputGroupAddon>
                  <Search className="size-3.5" />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <DataTable
              columns={column({
                from: data?.data.resource.pagination.from ?? 1,
              })}
              data={data?.data.resource.data ?? []}
            />
            <Pagination
              pagination={data?.data.resource.pagination}
              atomPage={staffPage}
              isPending={false}
            />
          </div>
        </div>
      )}
    </AtomValue>
  );
};
