import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { Pencil, Trash } from "lucide-react";
import { DELETE_SPACE } from "@/graphql/space";
import { Space as ISpace } from "@/types/space";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UpdateSpaceDialog from "./edit/index";

export default function Space({ space }: { space: ISpace }) {
  const router = useRouter();
  const [isUpdateSpaceDialog, setIsUpdateSpaceDialog] = useState(false);
  const [deleteSpace] = useMutation(DELETE_SPACE, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const onHandleDelete = (id: string) => {
    deleteSpace({
      variables: { id },
    });
  };
  return (
    <>
      {isUpdateSpaceDialog && (
        <UpdateSpaceDialog
          space={space}
          onClose={() => setIsUpdateSpaceDialog(false)}
        />
      )}

      <Card
        className="p-4 group hover:ring-1 ring-border cursor-pointer hover:border-foreground/20 hover:ease-in-out hover:transition-all"
        onClick={() => router.push(`/logs/${space.id}`)}
      >
        <div className="flex flex-col gap-2 h-full">
          <div className="flex justify-between items-start h-8">
            <h1 className="text-md font-semibold">{space.name}</h1>
            <div className="gap-2 flex">
              <Button
                size="icon"
                variant="outline"
                className="hidden group-hover:flex"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUpdateSpaceDialog(true);
                }}
              >
                <Pencil size={16} />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                className="hidden group-hover:flex"
                onClick={(e) => {
                  e.stopPropagation();
                  onHandleDelete(space.id);
                }}
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
          <p className="text-foreground/40 text-sm">{space.description}</p>
          <div className="pt-2 flex justify-between">
            <p className="text-sm text-foreground/80">Logs Count</p>
            <p className="text-sm">0</p>
          </div>
        </div>
      </Card>
    </>
  );
}
