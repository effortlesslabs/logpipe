"use client";

import { ControllerRenderProps } from "react-hook-form";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type DescriptionProps = {
  field: ControllerRenderProps<
    {
      name: string;
      description: string;
    },
    "description"
  >;
};

function Name(props: DescriptionProps) {
  return (
    <FormItem className="w-full">
      <FormLabel className="">Description</FormLabel>
      <FormControl>
        <Input placeholder="Name Of Api Key" {...props.field} />
      </FormControl>
    </FormItem>
  );
}

export default Name;
