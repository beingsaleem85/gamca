/**
 * Adaptive, Quality-First Client-Side Image Compression Utility.
 * 
 * Target: Keep individual file size under ~1.8 MB (giving ~3.6 MB combined payload,
 * well safely under Vercel's 4.5 MB serverless limit) while preserving maximum
 * sharpness and legibility for passport bio pages, CNICs, MRZ lines, and payment receipts.
 */

export interface AdaptiveCompressOptions {
  maxTargetBytes?: number; // Default 1.8 MB (1,887,436 bytes)
  initialMaxDimension?: number; // Default 2400px (ideal for small print legibility)
  initialQuality?: number; // Default 0.94 (94% quality, visually indistinguishable from raw)
}

/**
 * Helper to compress image at a specific max dimension & quality level.
 */
function renderCanvasBlob(
  img: HTMLImageElement,
  maxDim: number,
  quality: number,
  outputType: string = "image/jpeg"
): Promise<Blob | null> {
  return new Promise((resolve) => {
    let width = img.width;
    let height = img.height;

    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve(null);
      return;
    }

    // High quality bicubic image scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, width, height);

    canvas.toBlob((blob) => resolve(blob), outputType, quality);
  });
}

export async function compressImageFile(
  file: File,
  options: AdaptiveCompressOptions = {}
): Promise<File> {
  // 1. Non-image files (e.g. PDF) are returned as-is
  if (!file.type.startsWith("image/")) {
    return file;
  }

  const maxTargetBytes = options.maxTargetBytes || 1.8 * 1024 * 1024; // 1.8 MB

  // 2. If original file is ALREADY under target budget (<= 1.8 MB),
  // return original file directly to guarantee ZERO quality loss!
  if (file.size <= maxTargetBytes) {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      URL.revokeObjectURL(objectUrl);

      // Adaptive Stepping Schedule (Quality-first floor):
      // Pass 1: 2400px @ 94% quality (ideal for small print & MRZ lines)
      // Pass 2: 2200px @ 92% quality
      // Pass 3: 2000px @ 90% quality
      // Pass 4: 1800px @ 88% quality
      // Pass 5: 1600px @ 86% quality (floor quality to prevent JPEG ringing artifacts)
      const passes = [
        { maxDim: options.initialMaxDimension || 2400, quality: options.initialQuality || 0.94 },
        { maxDim: 2200, quality: 0.92 },
        { maxDim: 2000, quality: 0.90 },
        { maxDim: 1800, quality: 0.88 },
        { maxDim: 1600, quality: 0.86 },
      ];

      let bestBlob: Blob | null = null;

      for (const pass of passes) {
        const blob = await renderCanvasBlob(img, pass.maxDim, pass.quality);
        if (blob) {
          bestBlob = blob;
          // Stop as SOON as we get under target budget (1.8 MB)!
          if (blob.size <= maxTargetBytes) {
            break;
          }
        }
      }

      if (bestBlob && bestBlob.size < file.size) {
        const compressedFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
        const compressedFile = new File([bestBlob], compressedFileName, {
          type: "image/jpeg",
          lastModified: Date.now(),
        });
        resolve(compressedFile);
      } else {
        // Fallback to original file if compression didn't help
        resolve(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}
