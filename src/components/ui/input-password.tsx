import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { Eye, EyeOff, Lock, LucideIcon } from "lucide-react";

export const InputPassword = ({
  icon: Icon = Lock,
  autoComplete = "off",
  ...props
}: React.ComponentPropsWithoutRef<typeof InputGroupInput> & {
  icon?: LucideIcon;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        placeholder="••••••••"
        type={isVisible ? "text" : "password"}
        autoComplete={autoComplete}
      />
      <InputGroupAddon>
        <Icon className="size-3.5" />
      </InputGroupAddon>
      <InputGroupAddon align={"inline-end"}>
        <InputGroupButton
          tabIndex={-1}
          size={"icon-xs"}
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeOff className="size-3.5" />
          ) : (
            <Eye className="size-3.5" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
