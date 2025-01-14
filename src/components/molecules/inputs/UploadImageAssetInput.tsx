import { Button } from "@/components/ui/button";
import { ImageIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRef } from "react";

export const UploadImageAssetInput = ({
  onChange,
  uploadedThumbnailUrl,
  draftThumbnailBase64,
}: {
  onChange: (file: string) => void;
  uploadedThumbnailUrl: string | undefined;
  draftThumbnailBase64: string | undefined;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Make sure we have a string result
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      // Use readAsDataURL instead of readAsText
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      onChange(base64 as string);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const thumbnailUrl = draftThumbnailBase64 || uploadedThumbnailUrl;

  return (
    <div className="flex flex-col gap-2 items-center">
      {!!thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt="Thumbnail"
          width={300}
          height={300}
          className="rounded-md"
        />
      )}
      <Button variant="outline" onClick={handleButtonClick}>
        <ImageIcon className="w-4 h-4" />
        Attach Thumbnail
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
