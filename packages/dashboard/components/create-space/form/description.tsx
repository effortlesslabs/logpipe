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

type DescriptionProps = {
  field: ControllerRenderProps<
    {
      name: string;
      description: string;
    },
    "description"
  >;
};

function Description(props: DescriptionProps) {
  return (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <Input placeholder="space description" {...props.field} />
      </FormControl>
      <FormDescription>
        Description about the space you are creating.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}

export default Description;
