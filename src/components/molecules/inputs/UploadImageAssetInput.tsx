"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImageIcon, Cross2Icon } from "@radix-ui/react-icons";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE_MB = 10;

export const UploadImageAssetInput = ({
  onChange,
  uploadedThumbnailUrl,
  draftThumbnailBase64,
}: {
  onChange: (file: string | undefined) => void;
  uploadedThumbnailUrl: string | undefined;
  draftThumbnailBase64: string | undefined;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const thumbnailUrl = draftThumbnailBase64 || uploadedThumbnailUrl;

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Failed to read file"));
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const processFile = async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError(`Invalid file type. Accepted: JPG, PNG, WebP, GIF, AVIF.`);
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${MAX_SIZE_MB} MB.`);
      return;
    }
    setError(null);
    const base64 = await fileToBase64(file);
    onChange(base64);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => setIsDraggingOver(false);

  const handleRemove = () => {
    setError(null);
    onChange(undefined);
  };

  if (thumbnailUrl) {
    return (
      <div className="relative w-full rounded-lg overflow-hidden border border-border group">
        <Image
          src={thumbnailUrl}
          alt="Thumbnail"
          width={800}
          height={400}
          className="w-full object-cover max-h-64"
        />
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
          aria-label="Remove thumbnail"
        >
          <Cross2Icon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={[
          "w-full flex flex-col items-center justify-center gap-2 px-4 py-10 rounded-lg border-2 border-dashed transition-colors cursor-pointer",
          isDraggingOver
            ? "border-primary bg-primary/5"
            : error
            ? "border-destructive bg-destructive/5"
            : "border-border hover:border-primary/50 hover:bg-muted/40",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center justify-center w-12 h-12 rounded-full",
            error ? "bg-destructive/10" : "bg-primary/10",
          ].join(" ")}
        >
          <ImageIcon
            className={[
              "w-6 h-6",
              error ? "text-destructive" : "text-primary",
            ].join(" ")}
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">
            Click to select or drag &amp; drop
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            JPG, PNG, WebP, GIF, AVIF &mdash; up to {MAX_SIZE_MB} MB
          </p>
        </div>
      </button>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
