import { useAtomValue } from "jotai";
import { currentCartAtom } from "../../_api/queries";
import { Loader } from "../loader";
import { Delay } from "@suspensive/react";
import { ErrorHandling } from "../error-handling";
import { DataTable } from "@/components/data-table";
import { columnSelected } from "./columns/selected-columns";

export const Content = () => {
  const { data, refetch, isError, error, isSuccess, isRefetching } =
    useAtomValue(currentCartAtom);

  if (isError && isRefetching) return <Loader />;

  if (isError) {
    return (
      <Delay ms={500} fallback={<Loader />}>
        <ErrorHandling error={error as Error} refetch={refetch} />
      </Delay>
    );
  }

  if (isSuccess) {
    return (
      <Delay ms={500} fallback={<Loader />}>
        {/* Table Area */}
        <div className=" flex-1  overflow-hidden w-full">
          <div className="max-h-[calc(100svh-32px-40px-16px-65px-16px-16px)] h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
            <DataTable
              columns={columnSelected()}
              data={data?.resource?.products ?? []}
            />
          </div>
        </div>
      </Delay>
    );
  }

  return <Loader />;
};
