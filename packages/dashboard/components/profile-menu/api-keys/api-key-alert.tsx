import { Space } from "@/types/space";
import CopyButton from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function ApiKeyDisplayDialog({
  item,
  open,
  setOpen,
}: {
  item: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Key Generated</DialogTitle>
          <DialogDescription>
            <p className="mt-2 mb-4 text-sm text-gray-600">Your API Key:</p>
            <div className="p-2 bg-gray-100 rounded text-gray-900 font-mono flex justify-between items-center">
              {item}
              <CopyButton element={item} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ApiKeyDisplayDialog;
