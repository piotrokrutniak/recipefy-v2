import { uploadImageToCloudinary } from "@/lib/cloudinary";

export type ReplacedAsset = {
  srcBase64: string;
  srcUrl: string;
}

// TODO: clean-up job for oprhaned assets in cloudinary
export const uploadMarkupAssets = async (markup: string): Promise<ReplacedAsset[]> => {
  // Regular expression to match base64 image data in markup
  // Matches patterns like: data:image/jpeg;base64,/9j/4AAQSkZJRg...
  const base64Regex = /data:image\/[a-zA-Z]+;base64,[^"'\s)]+/g;
  
  const assetSrcs: string[] = markup.match(base64Regex) || [];

  // Map each base64 string to a ReplacedAsset object
  const replacedAssets = await Promise.all(
    assetSrcs.map(async (srcBase64) => {
      const srcUrl = await uploadImageToCloudinary(srcBase64);
      return {
        srcBase64,
        srcUrl,
      };
    })
  );

  return replacedAssets;
}