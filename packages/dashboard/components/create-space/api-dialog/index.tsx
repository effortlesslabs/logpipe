import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GENERATE_API_KEY } from "@/graphql/api";
import ApiKeyDisplayDialog from "@/components/profile-menu/api-keys/dialog";
import { Form, FormField } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import CreateApiKeyFormSchema from "./schema";
import Name from "./name";

function CreateApiDialog({ spaceId }: { spaceId: string }) {
  const [apiKey, setApiKey] = useState<string | null>(null); // Store the generated API key
  const [generateApiKey, { loading, error }] = useMutation(GENERATE_API_KEY, {
    onCompleted: ({ generateApiKey }) => {
      setApiKey(generateApiKey.key); // Store the API key
    },
  });
  const form = useForm<z.infer<typeof CreateApiKeyFormSchema>>({
    resolver: zodResolver(CreateApiKeyFormSchema),
    defaultValues: {
      name: "",
      spaceId,
    },
  });
  const onSubmit = (data: z.infer<typeof CreateApiKeyFormSchema>) => {
    generateApiKey({
      variables: { input: data },
    });
  };

  return (
    <>
      {apiKey && (
        <ApiKeyDisplayDialog
          generatedKey={apiKey}
          onClose={() => setApiKey(null)}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => <Name field={field} />}
          />
          <div>
            <Button type="submit" disabled={loading} variant={"outline"}>
              {loading ? "Creating..." : "Create Api Key"}
            </Button>
          </div>
          {error && <p className="text-red-500">{error.message}</p>}
        </form>
      </Form>
    </>
  );
}

export default CreateApiDialog;
