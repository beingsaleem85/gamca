/**
 * Client-side image compression utility using HTML5 Canvas.
 * Automatically resizes high-resolution phone photos / screenshots
 * down to max 1600px width/height and compresses to JPEG ~80% quality.
 * Reduces 3-8 MB camera photos down to 150-350 KB with zero loss of legibility.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputType?: string;
}

export async function compressImageFile(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  // If file is not an image (e.g. PDF), return original file as-is
  if (!file.type.startsWith("image/")) {
    return file;
  }

  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.8,
    outputType = "image/jpeg",
  } = options;

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.width;
      let height = img.height;

      // Calculate new dimensions keeping aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // Fallback to original file if canvas context unavailable
        resolve(file);
        return;
      }

      // Smooth scaling settings
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          // If compressed blob is smaller than original file, return compressed File
          if (blob.size < file.size) {
            const compressedFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
            const compressedFile = new File([blob], compressedFileName, {
              type: outputType,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            // Keep original if compression didn't reduce size
            resolve(file);
          }
        },
        outputType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Fallback to original file on error
      resolve(file);
    };

    img.src = objectUrl;
  });
}
