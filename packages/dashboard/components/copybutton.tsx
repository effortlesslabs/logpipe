import { useState } from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  element: string;
}

function CopyButton({ element }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(element);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Button
      onClick={copyToClipboard}
      className="w-8 h-8 bg-background text-black hover:bg-secondary p-0"
    >
      {copied ? <CheckIcon size={16} /> : <ClipboardIcon size={16} />}
    </Button>
  );
}

export default CopyButton;
