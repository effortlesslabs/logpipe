import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UPDATE_SPACE } from "@/graphql/space";
import { Space } from "@/types/space";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import ZodSpaceSchema from "@/components/create-space/form/schema";
import Name from "./name";
import Description from "./description";

type UpdateSpaceDialogProps = {
  space: Space;
  onClose: () => void;
};

function UpdateSpaceDialog({ space, onClose }: UpdateSpaceDialogProps) {
  const form = useForm<z.infer<typeof ZodSpaceSchema>>({
    resolver: zodResolver(ZodSpaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [updateSpace, { loading, error }] = useMutation(UPDATE_SPACE);

  const onSubmit = (data: z.infer<typeof ZodSpaceSchema>) => {
    updateSpace({
      variables: {
        id: space.id,
        input: {
          name: data.name,
          description: data.description,
        },
      },
    });
  };
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Space</DialogTitle>
          <DialogDescription>
            Edit the name and description of your space.
          </DialogDescription>
          <Form {...form}>
            <form
              className="flex justify-between w-full items-end gap-10"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex-col flex w-full gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => <Name field={field} />}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => <Description field={field} />}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating...." : "Submit"}
                </Button>
                {error && (
                  <div className="text-red-500 font-thin text-center">
                    {error.message}
                  </div>
                )}
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateSpaceDialog;
