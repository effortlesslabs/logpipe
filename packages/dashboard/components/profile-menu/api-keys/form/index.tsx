"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GENERATE_API_KEY } from "@/graphql/api";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SpacesDropdown from "./spaces";
import { useCallback } from "react";

type ApiKeyFormProps = {
  onSuccess: (key: string) => void;
};

const ApiKeyFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  spaceId: z.string(),
});

const defaultValues = {
  name: "",
  spaceId: "",
};

function ApiKeyForm(props: ApiKeyFormProps) {
  const form = useForm<z.infer<typeof ApiKeyFormSchema>>({
    resolver: zodResolver(ApiKeyFormSchema),
    defaultValues,
  });

  const [generateApiKey, { loading, error }] = useMutation(GENERATE_API_KEY, {
    onCompleted: ({ generateApiKey }) => {
      props.onSuccess(generateApiKey.key);
      form.reset();
    },
  });

  const onSubmit = useCallback(() => {
    (data: z.infer<typeof ApiKeyFormSchema>) => {
      generateApiKey({
        variables: { input: data },
      });
    };
  }, [generateApiKey]);

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form
          className="flex justify-between w-full items-end gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex justify-start flex-grow gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name Of Api Key" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="spaceId"
              render={({ field }) => (
                <SpacesDropdown
                  field={field}
                  handleSetValues={(value) => form.setValue("spaceId", value)}
                />
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Api Key"}
          </Button>
        </form>
      </Form>
      {error && (
        <div className="text-red-500 ml-2 mt-2 text-sm"> {error.message}</div>
      )}
    </div>
  );
}

export default ApiKeyForm;
