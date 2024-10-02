import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GENERATE_API_KEY } from "@/graphql/api";
import ApiKeyDisplayDialog from "../profile-menu/api-keys/api-key-alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  spaceId: z.string(),
});

function CreateApiDialog({ spaceId }: { spaceId: string }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null); // Store the generated API key
  const [generateApiKey, { loading, error }] = useMutation(GENERATE_API_KEY, {
    onCompleted: ({ generateApiKey }) => {
      setApiKey(generateApiKey.key); // Store the API key
      setAlertOpen(true);
    },
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      spaceId,
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    generateApiKey({
      variables: { input: data },
    });
  };

  return (
    <>
      {apiKey && (
        <ApiKeyDisplayDialog
          item={apiKey}
          open={alertOpen}
          setOpen={setAlertOpen}
        />
      )}{" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name Of Api Key" {...field} />
                </FormControl>
              </FormItem>
            )}
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
