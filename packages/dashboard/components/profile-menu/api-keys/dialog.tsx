"use client";

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

type ApiKeyDisplayDialogProps = {
  generatedKey: string | null;
  onClose: () => void;
};

function ApiKeyDisplayDialog({
  generatedKey,
  onClose,
}: ApiKeyDisplayDialogProps) {
  const open = generatedKey && generatedKey.length > 0 ? true : false;
  console.log("key", generatedKey);
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Key Generated</DialogTitle>
          <DialogDescription>
            <p className="mt-2 mb-4 text-sm text-gray-600">Your API Key:</p>
            <div className="p-2 bg-gray-100 rounded text-gray-900 font-mono flex justify-between items-center">
              {generatedKey}
              {generatedKey && <CopyButton element={generatedKey} />}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onClose()}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ApiKeyDisplayDialog;
