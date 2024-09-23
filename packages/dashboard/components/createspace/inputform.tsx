"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { CREATE_SPACE, GET_SPACES } from "@/graphql/space";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
});

export function InputForm() {
  const router = useRouter();
  const [createSpace, { loading, error }] = useMutation(CREATE_SPACE);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        const response = await createSpace({
          variables: { input: data },
          refetchQueries: [GET_SPACES],
        });
        if (response?.data) {
          router.push("/spaces");
        }
      } catch (error) {
        console.error("Error creating space:", error);
      }
    },
    [createSpace, router]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="space name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the space you are creating.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="space description" {...field} />
              </FormControl>
              <FormDescription>
                Description about the space you are creating.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Submit"}
        </Button>
        {error && (
          <div className="text-red-500 font-thin text-center">
            {error.message}
          </div>
        )}
      </form>
    </Form>
  );
}

export default InputForm;
