"use client";

import { DataTable } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { cn, invalidate } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { AtomValue } from "@suspensive/jotai";
import { useAtom, useAtomValue } from "jotai";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  CircleDashed,
  Plus,
  RefreshCw,
  Search,
  Send,
  Store,
  X,
  XCircle,
  XIcon,
} from "lucide-react";
import React from "react";
import { listStoreSelectAtom } from "../../stores/_api/queries";
import {
  memberAdminMonth,
  memberAdminOrder,
  memberAdminPage,
  memberAdminSearch,
  memberAdminSort,
  memberAdminStoreId,
  memberAdminYear,
} from "../_api/atom";
import { listMemberAtom, summaryMemberAtom } from "../_api/queries";
import { column } from "./columns";
import { eachYearOfInterval, getMonth, getYear } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addMemberAtom } from "../_api/mutations";
import { useQueryClient } from "@tanstack/react-query";

const monthSelect = [
  { label: "Januari", value: "1" },
  { label: "Februari", value: "2" },
  { label: "Maret", value: "3" },
  { label: "April", value: "4" },
  { label: "Mei", value: "5" },
  { label: "Juni", value: "6" },
  { label: "Juli", value: "7" },
  { label: "Agustus", value: "8" },
  { label: "September", value: "9" },
  { label: "Oktober", value: "10" },
  { label: "November", value: "11" },
  { label: "Desember", value: "12" },
];

const START_YEAR = 2026;
const currentYear = getYear(new Date());

const formSchema = z.object({
  name: z.string().min(1),
  store_id: z.string().min(1),
  phone: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export const MemberClient = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const { data: storeSelect, isLoading: isStoreSelectLoading } =
    useAtomValue(listStoreSelectAtom);
  const [storeId, setStoreId] = useAtom(memberAdminStoreId);
  const [sort, setSort] = useAtom(memberAdminSort);
  const [order, setOrder] = useAtom(memberAdminOrder);
  const [month, setMonth] = useAtom(memberAdminMonth);
  const [year, setYear] = useAtom(memberAdminYear);
  const monthFinal = monthSelect.slice(0, getMonth(new Date()) + 1);
  const monthFinalDisabled = monthSelect.slice(
    getMonth(new Date()) + 1,
    monthSelect.length,
  );
  const endYear = currentYear < START_YEAR ? START_YEAR : currentYear;
  const yearInterval = eachYearOfInterval({
    start: new Date(START_YEAR, 0, 1),
    end: new Date(endYear, 0, 1),
  });
  const yearSelect = yearInterval.map((item) => ({
    label: getYear(item).toString(),
    value: getYear(item).toString(),
  }));

  const { mutate: addMember, isPending: isAdding } =
    useAtomValue(addMemberAtom);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      name: "",
      store_id: "",
      phone: "",
    },
  });

  const handleSubmit = (values: FormSchema) => {
    addMember(
      {
        ...values,
        phone: values.phone,
        store_id: Number(values.store_id),
      },
      {
        onSuccess: async () => {
          await invalidate(queryClient, ["list-admin-member"]);
          form.reset();
          setOpen(false);
        },
      },
    );
  };

  return (
    <AtomValue atom={listMemberAtom}>
      {({ data, isSuccess, isPending, isRefetching, isError, refetch }) => (
        <AtomValue atom={summaryMemberAtom}>
          {({
            data: summary,
            isRefetching: isRefetchingSummary,
            refetch: refetchSummary,
            isLoading: isLoadingSummary,
          }) => (
            <div className="bg-white p-5 flex flex-col gap-4 rounded-xl shadow">
              <h1 className="font-semibold relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
                Member
              </h1>
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          disabled={isStoreSelectLoading}
                          variant={"outlineDestructive"}
                          className={cn(
                            "aria-expanded:bg-red-50 aria-expanded:text-red-600 border-dashed overflow-hidden hover:bg-red-50",
                            storeId ? "pr-0" : "pr-2.5",
                          )}
                          size={"sm"}
                        >
                          <CircleDashed className="size-3.5" />
                          <span className="text-xs">Toko</span>
                          {storeId && (
                            <div className="h-7 flex items-center px-2 text-xs bg-red-50 border-dashed border-l border-red-400 ml-1">
                              {
                                storeSelect?.find(
                                  (i) => i.id === Number.parseFloat(storeId),
                                )?.store_name
                              }
                            </div>
                          )}
                        </Button>
                      }
                    />
                    <PopoverContent
                      className={"p-0 w-auto overflow-hidden relative"}
                      align="start"
                    >
                      <Command className="p-0">
                        <CommandInput
                          className="placeholder:text-xs text-xs [&_svg]:size-3.5! h-7"
                          placeholder="Cari toko..."
                        />
                        <CommandList>
                          <CommandEmpty className="text-xs">
                            No results found.
                          </CommandEmpty>
                          <CommandGroup className="pb-10">
                            {storeSelect?.map((item) => (
                              <CommandItem
                                key={item.id}
                                data-checked={storeId === item.id.toString()}
                                onSelect={() =>
                                  setStoreId(
                                    storeId === item.id.toString()
                                      ? ""
                                      : item.id.toString(),
                                  )
                                }
                                className="text-xs h-8"
                              >
                                <Store className="size-3.5" />
                                {item.store_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandGroup className="absolute bottom-0 bg-white w-full border-t">
                            <CommandItem
                              className="text-xs h-8"
                              onSelect={() => setStoreId("")}
                            >
                              <X className="size-3.5" />
                              Reset
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          disabled={isStoreSelectLoading}
                          variant={"outlineDestructive"}
                          className={cn(
                            "aria-expanded:bg-red-50 aria-expanded:text-red-600 border-dashed overflow-hidden hover:bg-red-50",
                            month || year ? "pr-0" : "pr-2.5",
                          )}
                          size={"sm"}
                        >
                          <CircleDashed className="size-3.5" />
                          <span className="text-xs">Bulan</span>
                          {(month || year) && (
                            <div className="h-7 flex items-center px-2 text-xs bg-red-50 border-dashed border-l border-red-400 ml-1">
                              {
                                monthSelect?.find((i) => i.value === month)
                                  ?.label
                              }{" "}
                              {yearSelect?.find((i) => i.value === year)?.label}
                            </div>
                          )}
                        </Button>
                      }
                    />
                    <PopoverContent
                      className={"p-0 w-auto overflow-hidden relative gap-0"}
                      align="start"
                    >
                      <div className="grid grid-cols-2 w-60">
                        <Command className="p-0">
                          <CommandList>
                            <CommandGroup heading="Bulan">
                              {Number(year) === currentYear ? (
                                <>
                                  {monthFinal.map((item) => (
                                    <CommandItem
                                      className="text-xs h-7"
                                      key={item.value}
                                      data-checked={month === item.value}
                                      onSelect={() => setMonth(item.value)}
                                    >
                                      {item.label}
                                    </CommandItem>
                                  ))}
                                  {monthFinalDisabled.map((item) => (
                                    <CommandItem
                                      className="text-xs h-7"
                                      key={item.value}
                                      onSelect={() => setMonth(item.value)}
                                      disabled
                                    >
                                      {item.label}
                                    </CommandItem>
                                  ))}
                                </>
                              ) : (
                                monthSelect.map((item) => (
                                  <CommandItem
                                    className="text-xs h-7"
                                    key={item.value}
                                    data-checked={month === item.value}
                                    onSelect={() => setMonth(item.value)}
                                  >
                                    {item.label}
                                  </CommandItem>
                                ))
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                        <Command className="p-0">
                          <CommandList>
                            <CommandGroup heading="Tahun">
                              {yearSelect.map((item) => (
                                <CommandItem
                                  className="text-xs h-7"
                                  key={item.value}
                                  data-checked={year === item.value}
                                  onSelect={() => {
                                    if (item.value === currentYear.toString()) {
                                      setMonth(monthFinal.length.toString());
                                      setYear(item.value);
                                    } else {
                                      setMonth("1");
                                      setYear(item.value);
                                    }
                                  }}
                                >
                                  {item.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </div>
                      <Button
                        variant={"ghost"}
                        className="text-xs h-7 m-1 justify-start"
                        onClick={() => {
                          setMonth("");
                          setYear("");
                        }}
                      >
                        <XIcon className="size-3.5" />
                        Reset
                      </Button>
                    </PopoverContent>
                  </Popover>
                  {(!!storeId || !!month || !!year) && (
                    <Button
                      variant={"outlineDestructive"}
                      className={
                        "aria-expanded:bg-red-50 aria-expanded:text-red-600 border-dashed overflow-hidden hover:bg-red-50"
                      }
                      size={"sm"}
                      onClick={() => {
                        setStoreId("");
                        setMonth("");
                        setYear("");
                      }}
                    >
                      <X className="size-3.5" />
                      Reset
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <MemberSearchInput
                    disabled={isPending || isRefetching}
                    isSuccess={isSuccess}
                    isError={isError}
                  />
                  <Button
                    variant={"outlineDestructive"}
                    size={"icon"}
                    onClick={() => {
                      refetch();
                      refetchSummary();
                    }}
                  >
                    <RefreshCw
                      className={cn(
                        "size-3.5",
                        isRefetching && isRefetchingSummary && "animate-spin",
                      )}
                    />
                  </Button>
                  <Popover>
                    <TooltipText
                      value="Urutan"
                      render={
                        <PopoverTrigger
                          render={
                            <Button
                              variant={"outlineDestructive"}
                              size={"icon"}
                              className={
                                "aria-expanded:text-red-500 aria-expanded:bg-red-50"
                              }
                            >
                              <ArrowUpDown className="size-3.5" />
                            </Button>
                          }
                        />
                      }
                    />
                    <PopoverContent className={"p-0 w-auto"} sideOffset={10}>
                      <Command className="p-0 ">
                        <CommandList>
                          <CommandGroup heading="Sort">
                            <CommandItem
                              className="text-xs h-7"
                              onSelect={() => setSort("monthly_transaction")}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center border rounded border-red-500 flex-none size-3.5",
                                  sort === "monthly_transaction" &&
                                    "bg-red-500",
                                )}
                              >
                                <Check
                                  className={cn(
                                    "size-3 text-white",
                                    sort === "monthly_transaction"
                                      ? "flex"
                                      : "hidden",
                                  )}
                                />
                              </div>
                              Transaksi Bulanan
                            </CommandItem>
                            <CommandItem
                              className="text-xs h-7"
                              onSelect={() => setSort("monthly_point")}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center border rounded border-red-500 flex-none size-3.5",
                                  sort === "monthly_point" && "bg-red-500",
                                )}
                              >
                                <Check
                                  className={cn(
                                    "size-3 text-white",
                                    sort === "monthly_point"
                                      ? "flex"
                                      : "hidden",
                                  )}
                                />
                              </div>
                              Poin Bulanan
                            </CommandItem>
                            <CommandItem
                              className="text-xs h-7"
                              onSelect={() => setSort("total_shopping")}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center border rounded border-red-500 flex-none size-3.5",
                                  sort === "total_shopping" && "bg-red-500",
                                )}
                              >
                                <Check
                                  className={cn(
                                    "size-3 text-white",
                                    sort === "total_shopping"
                                      ? "flex"
                                      : "hidden",
                                  )}
                                />
                              </div>
                              Total Transaksi
                            </CommandItem>
                            <CommandItem
                              className="text-xs h-7"
                              onSelect={() => setSort("total_point")}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center border rounded border-red-500 flex-none size-3.5",
                                  sort === "total_point" && "bg-red-500",
                                )}
                              >
                                <Check
                                  className={cn(
                                    "size-3 text-white",
                                    sort === "total_point" ? "flex" : "hidden",
                                  )}
                                />
                              </div>
                              Total Poin
                            </CommandItem>
                            <CommandItem
                              className="text-xs h-7"
                              onSelect={() => setSort("")}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center border rounded border-red-500 flex-none size-3.5",
                                  sort === "" && "bg-red-500",
                                )}
                              >
                                <Check
                                  className={cn(
                                    "size-3 text-white",
                                    sort === "" ? "flex" : "hidden",
                                  )}
                                />
                              </div>
                              Dibuat
                            </CommandItem>
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup heading="Order">
                            <CommandItem
                              className="text-xs h-7"
                              onSelect={() => setOrder("asc")}
                              data-checked={order === "asc"}
                            >
                              <ArrowUp className="size-3" />
                              ASC
                            </CommandItem>
                            <CommandItem
                              className="text-xs h-7"
                              onSelect={() => setOrder("desc")}
                              data-checked={order === "desc"}
                            >
                              <ArrowDown className="size-3" />
                              DESC
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <TooltipText
                      value="Tambah Member"
                      render={
                        <DialogTrigger
                          render={
                            <Button variant={"diskonter"} size={"icon"}>
                              <Plus className="size-3.5" />
                            </Button>
                          }
                        />
                      }
                    />
                    <DialogContent showCloseButton={false}>
                      <DialogHeader>
                        <DialogTitle>Tambah Member</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex flex-col gap-2">
                          <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                              <Field
                                className="gap-1"
                                data-invalid={fieldState.invalid}
                              >
                                <FieldLabel required htmlFor={field.name}>
                                  Name
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  required
                                  placeholder="cth. Jhon Doe"
                                  autoComplete="off"
                                  disabled={isAdding || field.disabled}
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                          <Controller
                            control={form.control}
                            name="phone"
                            render={({ field, fieldState }) => (
                              <Field
                                className="gap-1"
                                data-invalid={fieldState.invalid}
                              >
                                <FieldLabel required htmlFor={field.name}>
                                  No. Hp.
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  type="number"
                                  inputMode="numeric"
                                  placeholder="cth. 088888888888"
                                  required
                                  autoComplete="off"
                                  disabled={isAdding || field.disabled}
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                          <Controller
                            control={form.control}
                            name="store_id"
                            render={({ field, fieldState }) => (
                              <Field
                                className="gap-1"
                                data-invalid={fieldState.invalid}
                              >
                                <FieldLabel required htmlFor={field.name}>
                                  Toko
                                </FieldLabel>
                                <Popover>
                                  <PopoverTrigger
                                    render={
                                      <Button
                                        disabled={
                                          isStoreSelectLoading || isAdding
                                        }
                                        variant={"outline"}
                                        className={
                                          "justify-start border-gray-300"
                                        }
                                      >
                                        <Store className="size-3.5" />
                                        <span className="text-xs">
                                          {field.value
                                            ? storeSelect?.find(
                                                (i) =>
                                                  i.id ===
                                                  Number.parseFloat(
                                                    field.value,
                                                  ),
                                              )?.store_name
                                            : "Pilih Toko"}
                                        </span>
                                      </Button>
                                    }
                                  />
                                  <PopoverContent
                                    className={"p-0 overflow-hidden relative"}
                                  >
                                    <Command className="p-0">
                                      <CommandInput
                                        className="placeholder:text-xs text-xs [&_svg]:size-3.5! h-7"
                                        placeholder="Cari toko..."
                                      />
                                      <CommandList>
                                        <CommandEmpty className="text-xs">
                                          No results found.
                                        </CommandEmpty>
                                        <CommandGroup className="pb-10">
                                          {storeSelect?.map((item) => (
                                            <CommandItem
                                              key={item.id}
                                              data-checked={
                                                field.value ===
                                                item.id.toString()
                                              }
                                              onSelect={() =>
                                                field.onChange(
                                                  field.value ===
                                                    item.id.toString()
                                                    ? ""
                                                    : item.id.toString(),
                                                )
                                              }
                                              className="text-xs h-8"
                                            >
                                              <Store className="size-3.5" />
                                              {item.store_name}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose
                            render={
                              <Button type="button" variant={"outline"}>
                                <XIcon className="size-3.5" />
                                Tutup
                              </Button>
                            }
                          />
                          <Button type="submit">
                            {isAdding ? (
                              <Spinner className="size-3.5" />
                            ) : (
                              <Send className="size-3.5" />
                            )}
                            {isAdding ? "Mengirim..." : "Kirim"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col border border-gray-300 rounded-xl px-4 py-2 text-sm gap-1">
                  <div className="flex items-center gap-2">
                    <p>Total Member</p>
                    {(isLoadingSummary || isRefetchingSummary) && (
                      <Spinner className="size-3 text-gray-500" />
                    )}
                  </div>
                  <p className="text-xl font-semibold">
                    {summary?.resource.total_all?.toLocaleString() ?? 0}
                  </p>
                </div>
                <div className="flex flex-col border border-gray-300 rounded-xl px-4 py-2 text-sm gap-1">
                  <div className="flex items-center gap-2">
                    <p>Member Aktif</p>
                    {(isLoadingSummary || isRefetchingSummary) && (
                      <Spinner className="size-3 text-gray-500" />
                    )}
                  </div>
                  <p className="text-xl font-semibold">
                    {summary?.resource.total_active?.toLocaleString() ?? 0}
                  </p>
                </div>
                <div className="flex flex-col border border-gray-300 rounded-xl px-4 py-2 text-sm gap-1">
                  <div className="flex items-center gap-2">
                    <p>Member Tidak Aktif</p>
                    {(isLoadingSummary || isRefetchingSummary) && (
                      <Spinner className="size-3 text-gray-500" />
                    )}
                  </div>
                  <p className="text-xl font-semibold">
                    {summary?.resource.total_inactive?.toLocaleString() ?? 0}
                  </p>
                </div>
                <div className="flex flex-col border border-gray-300 rounded-xl px-4 py-2 text-sm gap-1">
                  <div className="flex items-center gap-2">
                    <p>Member Baru</p>
                    {(isLoadingSummary || isRefetchingSummary) && (
                      <Spinner className="size-3 text-gray-500" />
                    )}
                  </div>
                  <p className="text-xl font-semibold">
                    {summary?.resource.new_member?.toLocaleString() ?? 0}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <DataTable
                  columns={column({
                    from: data?.resource.pagination.from ?? 0,
                  })}
                  data={data?.resource.data ?? []}
                />
                <Pagination
                  atomPage={memberAdminPage}
                  pagination={data?.resource.pagination}
                  isPending={isPending || isRefetching}
                />
              </div>
            </div>
          )}
        </AtomValue>
      )}
    </AtomValue>
  );
};

const MemberSearchInput = ({
  disabled,
  isSuccess,
  isError,
}: {
  disabled: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useAtom(memberAdminSearch);
  const [localValue, setLocalValue] = React.useState(search);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handler = setTimeout(() => setSearch(localValue), 500);
    return () => clearTimeout(handler);
  }, [localValue, setSearch]);

  React.useEffect(() => {
    setLocalValue(search);
  }, [search]);

  React.useEffect(() => {
    if ((!disabled && isSuccess) || (!disabled && isError)) {
      inputRef.current?.focus();
    }
  }, [disabled, isSuccess, isError]);

  return (
    <InputGroup className="has-disabled:opacity-100 has-disabled:bg-transparent w-64">
      <InputGroupInput
        placeholder="Cari member..."
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="disabled:opacity-100"
        disabled={disabled}
      />
      <InputGroupAddon>
        <Search className="size-3.5" />
      </InputGroupAddon>
      {disabled && (
        <InputGroupAddon align="inline-end">
          <Spinner className="size-3.5" />
        </InputGroupAddon>
      )}
      {!disabled && search.length > 0 && (
        <InputGroupAddon align="inline-end">
          <TooltipText
            value="Bersihkan pencarian"
            render={
              <InputGroupButton size="icon-xs" onClick={() => setSearch("")}>
                <XCircle className="size-3.5" />
              </InputGroupButton>
            }
          />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};
