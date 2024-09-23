"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { GENERATE_API_KEY } from "@/graphql/api";
import { GET_SPACES } from "@/graphql/space";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCallback } from "react";
import CopyButton from "@/components/copybutton";
import { space } from "postcss/lib/list";

enum Expiry {
  DAY = "1 day",
  WEEK = "1 week",
  MONTH = "1 month",
  YEAR = "1 year",
  NEVER = "Never",
}

const ApiKeyFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  spaceId: z.string(),
  expiry: z.enum([
    Expiry.DAY,
    Expiry.WEEK,
    Expiry.MONTH,
    Expiry.YEAR,
    Expiry.NEVER,
  ]),
});

function ApiKeyForm() {
  const [generateApiKey, { loading, error }] = useMutation(GENERATE_API_KEY);
  const spaceId = useQuery(GET_SPACES).data?.spaces[0].id;
  const form = useForm<z.infer<typeof ApiKeyFormSchema>>({
    resolver: zodResolver(ApiKeyFormSchema),
    defaultValues: {
      name: "",
      spaceId,
      expiry: Expiry.NEVER,
    },
  });

  const onSubmit = (data: z.infer<typeof ApiKeyFormSchema>) => {
    //     useCallback(async () => {
    //       try {
    //         const response = await generateApiKey({
    //           variables: { input: data },
    //         });
    //         if (response?.data) {
    //           let { key, name } = response.data.generateApiKey;
    //           console.log("Your key is: ", key);
    //         }
    //       } catch (error) {
    //         console.error("Error generating api key:", error);
    //       }
    //     }, [generateApiKey]);
    //   };

    return (
      <div className="h-20 flex">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="api key name"
                      {...field}
                      className="outline-muted-foreground/80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {Object.values(Expiry).map((value) => (
                          <DropdownMenuItem
                            key={value}
                            onSelect={() => form.setValue("expiry", value)}
                          >
                            {value}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Dialog>
            <DialogTrigger asChild> */}
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Api Key"}
            </Button>
            {/* </DialogTrigger>
            <DialogContent className="flex flex-col justify-center">
              <DialogHeader>Api Key Created</DialogHeader>
              <DialogDescription>
                Please copy your token and store it in a safe place.
                <b>For security reasons we cannot show it again.</b>
              </DialogDescription>
              <div className="w-full rounded-md p-2 flex items-center h-10 justify-between">
                <p>Your Key is in console.</p>
                <CopyButton element={key} /> 
              </div>
            </DialogContent>
          </Dialog> */}

            {error && (
              <div className="text-red-500 font-thin text-center">
                {error.message}
              </div>
            )}
          </form>
        </Form>
      </div>
    );
  };
}

export default ApiKeyForm;
