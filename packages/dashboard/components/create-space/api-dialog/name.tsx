"use client";

import { ControllerRenderProps } from "react-hook-form";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type NameProps = {
  field: ControllerRenderProps<
    {
      name: string;
      spaceId: string;
    },
    "name"
  >;
};

function Name(props: NameProps) {
  return (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input placeholder="Name Of Api Key" {...props.field} />
      </FormControl>
    </FormItem>
  );
}

export default Name;
