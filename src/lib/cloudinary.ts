import axios from "axios";

async function uploadImageToCloudinary(imageData: string | File) {
  const formData = new FormData();

  if (typeof imageData === "string" && imageData.startsWith("data:image")) {
    // Convert base64 to blob
    const response = await fetch(imageData);
    const blob = await response.blob();
    formData.append("file", blob);
  } else if (imageData instanceof File) {
    formData.append("file", imageData);
  } else {
    throw new Error("Invalid image format");
  }

  formData.append(
    "upload_preset",
    process.env.CLOUDINARY_UPLOAD_PRESET ?? "default"
  ); // Your existing upload preset

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw new Error("Failed to upload image");
  }
}

// Helper function to process content and replace all base64 images
export async function processContentImages(content: string): Promise<string> {
  const base64Regex = /data:image\/[^;]+;base64,[^"]+/g;
  const base64Images = content.match(base64Regex) || [];
  let processedContent = content;

  for (const base64Image of base64Images) {
    try {
      const imageUrl = await uploadImageToCloudinary(base64Image);
      processedContent = processedContent.replace(base64Image, imageUrl);
    } catch (error) {
      console.error("Failed to process image:", error);
    }
  }

  return processedContent;
}

export { uploadImageToCloudinary };
