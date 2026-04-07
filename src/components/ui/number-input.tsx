import React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { Label } from "./label";
import { LucideIcon, MinusIcon, MoveHorizontal, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const NumberField = ({
  className,
  ...props
}: NumberFieldPrimitive.Root.Props) => {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      {...props}
      className={cn("flex flex-col gap-1", className)}
    />
  );
};

const NumberFieldLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof Label>) => {
  return (
    <NumberFieldPrimitive.ScrubArea className={"w-fit"}>
      <Label {...props} className={cn("cursor-ew-resize", className)} />
      <NumberFieldPrimitive.ScrubAreaCursor
        className={"drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] z-50"}
      >
        <MoveHorizontal className="size-4" />
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  );
};
const NumberFieldContent = ({
  iconDecrement: IconDecrement = MinusIcon,
  iconIncrement: IconIncrement = PlusIcon,
  className,
  ...props
}: NumberFieldPrimitive.Group.Props & {
  iconDecrement?: LucideIcon;
  iconIncrement?: LucideIcon;
}) => {
  return (
    <NumberFieldPrimitive.Group
      {...props}
      className={cn(
        "flex items-center h-7 [&_svg]:size-4 border border-gray-300 w-fit divide-x overflow-hidden rounded-md",
        className,
      )}
    >
      <NumberFieldPrimitive.Decrement
        className={
          "h-full aspect-square flex-none hover:bg-muted flex items-center justify-center"
        }
      >
        <IconDecrement />
      </NumberFieldPrimitive.Decrement>
      <NumberFieldPrimitive.Input className="h-full w-full max-w-16 text-center focus-visible:outline-none text-base sm:text-sm" />
      <NumberFieldPrimitive.Increment
        className={
          "h-full aspect-square flex-none hover:bg-muted flex items-center justify-center"
        }
      >
        <IconIncrement />
      </NumberFieldPrimitive.Increment>
    </NumberFieldPrimitive.Group>
  );
};

export { NumberField, NumberFieldLabel, NumberFieldContent };
