import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { addToCartAtom } from "../../_api/mutation";
import { paymentCustomer, paymentMethodSelected } from "../../_api/atoms";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ScanBarcode, XCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";
import { invalidate } from "@/lib/utils";

export const BarcodeSearch = ({ isRefetching }: { isRefetching: boolean }) => {
  const queryClient = useQueryClient();
  const [localValue, setLocalValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    mutate: addToCart,
    isPending: isAdding,
    isSuccess: isAddingSuccess,
    isError: isAddingError,
  } = useAtomValue(addToCartAtom);
  const setPayment = useSetAtom(paymentCustomer);
  const setPaymentMethod = useSetAtom(paymentMethodSelected);

  useEffect(() => {
    if (!localValue) return;

    const handler = setTimeout(() => {
      addToCart(
        { reference_id: localValue, type: "product" },
        {
          onSuccess: async () => {
            setLocalValue("");
            setPayment(0);
            setPaymentMethod(null);
            await Promise.all([
              invalidate(queryClient, ["current-cart"]),
              invalidate(queryClient, ["list-product"]),
            ]);
          },
        },
      );
    }, 500);

    return () => clearTimeout(handler);
  }, [localValue, addToCart, queryClient, setPayment, setPaymentMethod]);

  useEffect(() => {
    if (!isRefetching && !isAdding && (isAddingSuccess || isAddingError)) {
      inputRef.current?.focus();
    }
  }, [isRefetching, isAdding, isAddingSuccess, isAddingError]);

  return (
    <InputGroup className="has-disabled:opacity-100 has-disabled:bg-white bg-white border-red-300 has-[[data-slot=input-group-control]:focus-visible]:border-red-400">
      <InputGroupInput
        placeholder="Cari atau scan barcode..."
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="disabled:opacity-100"
        disabled={isRefetching || isAdding}
      />
      <InputGroupAddon>
        <ScanBarcode className="size-3.5 text-red-500" />
      </InputGroupAddon>

      {isRefetching || isAdding ? (
        <InputGroupAddon align="inline-end">
          <Spinner className="size-3.5" />
        </InputGroupAddon>
      ) : localValue.length > 0 ? (
        <InputGroupAddon align="inline-end">
          <TooltipText
            value="Bersihkan"
            sideOffset={10}
            render={
              <InputGroupButton
                variant={"ghost"}
                className={"hover:bg-red-100"}
                size="icon-xs"
                onClick={() => setLocalValue("")}
              >
                <XCircle className="size-3.5" />
              </InputGroupButton>
            }
          />
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
};
