"use client";

import { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type NameProps = {
  field: ControllerRenderProps<
    {
      name: string;
      description: string;
    },
    "name"
  >;
};

function Name(props: NameProps) {
  return (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input placeholder="space name" {...props.field} />
      </FormControl>
      <FormDescription>
        This is the name of the space you are creating.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}

export default Name;
