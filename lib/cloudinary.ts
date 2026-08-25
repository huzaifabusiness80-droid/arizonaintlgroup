import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "qkrhhexx",
  api_key: process.env.CLOUDINARY_API_KEY || "952564922948673",
  api_secret: process.env.CLOUDINARY_API_SECRET || "-UdEgR78jGzh2l_pryCMf5r0EOA",
  secure: true,
});

export default cloudinary;

/**
 * Upload a file/image buffer or base64 string to Cloudinary
 * @param fileData Base64 string or file path
 * @param folder Cloudinary folder name (default: "arizonaintl")
 */
export async function uploadToCloudinary(
  fileData: string,
  folder: string = "arizonaintl"
) {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileData, {
      folder: folder,
      resource_type: "auto",
    });

    return {
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      format: uploadResponse.format,
      width: uploadResponse.width,
      height: uploadResponse.height,
    };
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error?.message || "Failed to upload to Cloudinary",
    };
  }
}

/**
 * Delete an asset from Cloudinary by public ID
 */
export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error: any) {
    console.error("Cloudinary deletion error:", error);
    return { success: false, error: error?.message || "Deletion failed" };
  }
}

/**
 * Generate an optimized Cloudinary delivery URL
 */
export function getOptimizedImageUrl(
  publicIdOrUrl: string,
  options?: { width?: number; height?: number; crop?: string; quality?: string | number }
) {
  if (!publicIdOrUrl) return "";

  // If it's already a full URL
  if (publicIdOrUrl.startsWith("http://") || publicIdOrUrl.startsWith("https://")) {
    return publicIdOrUrl;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "qkrhhexx";
  const transformations = [];

  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);
  transformations.push("f_auto");

  const transStr = transformations.join(",");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transStr}/${publicIdOrUrl}`;
}
