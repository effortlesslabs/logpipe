"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GENERATE_API_KEY } from "@/graphql/api";
import { GET_SPACES } from "@/graphql/space";
import { Space } from "@/types/space";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ApiKeyDisplayDialog from "./api-key-alert";

// TODO: Implement Expiry Options for the Api Keys
// enum Expiry {
//   DAY = "1 day",
//   WEEK = "1 week",
//   MONTH = "1 month",
//   YEAR = "1 year",
//   NEVER = "Never",
// }

const ApiKeyFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  spaceId: z.string(),
  // expiry: z.enum([
  //   Expiry.DAY,
  //   Expiry.WEEK,
  //   Expiry.MONTH,
  //   Expiry.YEAR,
  //   Expiry.NEVER,
  // ]),
});

function ApiKeyForm() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null); // Store the generated API key
  const [alertOpen, setAlertOpen] = useState(false);
  const [generateApiKey, { loading, error }] = useMutation(GENERATE_API_KEY, {
    onCompleted: ({ generateApiKey }) => {
      setApiKey(generateApiKey.key); // Store the API key
      setAlertOpen(true);
    },
  });
  const { data } = useQuery(GET_SPACES);
  const form = useForm<z.infer<typeof ApiKeyFormSchema>>({
    resolver: zodResolver(ApiKeyFormSchema),
    defaultValues: {
      name: "",
      spaceId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ApiKeyFormSchema>) => {
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
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" h-24 w-full flex items-center p-2 gap-4"
        >
          <div className="w-96 h-20">
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
          </div>
          <div className="w-96 h-20 ">
            <FormField
              control={form.control}
              name="spaceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SpaceId</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Input
                          className="w-96 cursor-pointer"
                          placeholder="Select Space"
                          {...field}
                          value={selectedSpace?.name || "Select Space"}
                          readOnly
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {data?.spaces.map((space: Space) => (
                          <DropdownMenuItem
                            className="w-96"
                            key={space.id}
                            onClick={() => {
                              setSelectedSpace(space);
                              form.setValue("spaceId", space.id);
                            }}
                          >
                            {space.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-56 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Api Key"}
            </Button>
            {error && (
              <div className="text-red-500 font-thin text-center">
                {error.message}
              </div>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}

export default ApiKeyForm;
