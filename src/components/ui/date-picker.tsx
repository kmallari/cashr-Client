import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/tw-merge";

type DatePickerProps<T extends FieldValues, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>;
};

const DatePicker = <T extends FieldValues, K extends Path<T>>({
  field,
}: DatePickerProps<T, K>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value ? (
              <span className="text-xs font-medium">
                {dayjs(field.value).format("MMM D, YYYY")}
              </span>
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
export default DatePicker;
