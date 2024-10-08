"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GENERATE_API_KEY } from "@/graphql/api";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import ApiKeyFormSchema from "./schema";
import Name from "./name";
import SpacesDropdown from "./spaces";

type ApiKeyFormProps = {
  onSuccess: (key: string) => void;
};

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

  const onSubmit = useCallback(
    (data: z.infer<typeof ApiKeyFormSchema>) => {
      console.log("data", data);
      generateApiKey({
        variables: { input: data },
      });
    },
    [generateApiKey]
  );

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
              render={({ field }) => <Name field={field} />}
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
