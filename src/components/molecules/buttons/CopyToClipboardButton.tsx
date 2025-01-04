"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaCopy, FaRegCopy } from "react-icons/fa";

export const CopyToClipboardButton = ({ text }: { text: string }) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard",
    });
  };
  return (
    <Button variant="outline" size={"icon"} onClick={copyToClipboard}>
      <FaRegCopy />
    </Button>
  );
};
