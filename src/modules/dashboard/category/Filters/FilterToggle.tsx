import * as TogglePrimitive from "@radix-ui/react-toggle";
import { VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import React, { type FC } from "react";

import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/tw-merge";

interface FilterToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  pressed: boolean;
  filterName: string;
}

const FilterToggle: FC<FilterToggleProps> = ({ filterName, ...props }) => {
  const { ...allProps } = props;
  return (
    <Toggle
      {...allProps}
      className="hover:text-inhert flex h-fit flex-row gap-1 p-0 text-xs hover:bg-inherit data-[state=on]:bg-inherit data-[state=on]:text-inherit"
    >
      <div className="h-3 w-3 rounded-sm bg-stone-200">
        <Check
          className={cn(
            "h-full w-full opacity-0 dark:text-stone-950",
            props.pressed && "opacity-100",
          )}
        />
      </div>
      {filterName}
    </Toggle>
  );
};
export default FilterToggle;
