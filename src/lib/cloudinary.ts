import axios from "axios";

async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "default"); // Replace 'default' with your Cloudinary upload preset

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/recipefy/image/upload",
      formData
    );
    return response.data.url; // This is the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw new Error("Failed to upload image");
  }
}
