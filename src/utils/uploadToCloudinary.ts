export async function uploadToCloudinary(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "ecommerce_store");
  formData.append("folder", "stores");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dsz97vwsj/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("Erro ao fazer upload no Cloudinary");
  }

  return data.secure_url;
}