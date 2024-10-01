"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { CREATE_SPACE, GET_SPACES } from "@/graphql/space";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import CreateApiDialog from "./create-api-dialouge";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [spaceId, setSpaceId] = useState("");
  const [createSpace, { loading, error }] = useMutation(CREATE_SPACE, {
    onCompleted: (data) => {
      setSpaceId(data.createSpace.id);
    },
  });
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
          setIsDialogOpen(true);
        }
      } catch (error) {
        console.error("Error creating space:", error);
      }
    },
    [createSpace]
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-auto sm:max-w-lg h-auto p-6">
          <DialogHeader>
            <DialogTitle>Space Created</DialogTitle>
            <DialogDescription>
              Your space has been successfully created.
              <br />
              You can now create an API key for this space.
            </DialogDescription>
          </DialogHeader>
          <div>
            <CreateApiDialog spaceId={spaceId} />
          </div>

          <DialogFooter className="flex justify-between w-full">
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                router.push("/spaces");
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

export default InputForm;
