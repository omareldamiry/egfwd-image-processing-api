import { promises as fs, existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';
import ImageOptions from '../models/image-options';
import * as dotenv from 'dotenv';

dotenv.config();

const imgDir = process.env.IMG_DIR || '';         // Images Directory
const outDir = process.env.OUT_DIR || '';         // Output Directory

export async function getImage(inputImagePath: string): Promise<Buffer | null> {
  // Checks if file exists
  if (existsSync(inputImagePath)) {
    try {
      const image = await fs.readFile(inputImagePath);
      // Returns image as Buffer
      return image;
    } catch (err) {
      // Returns null on error
      return null;
    }
  }
  // Returns null if file does not exist
  return null;
}

export async function resizeImg(imgOptions: ImageOptions): Promise<string | null> {
  // Input and output image files
  const inputImage = path.join(imgDir, `${imgOptions.filename}.jpg`);
  const outputImage = path.join(
    outDir,
    `${imgOptions.filename}_${imgOptions.width || 'unset'}_${imgOptions.height || 'unset'}.jpg`
  );

  if (!existsSync(outputImage)) {
    // Returns an image as Buffer or null if not found
    const image = await getImage(inputImage);

    // Discontinue the process if no image is found
    if (!image) return null;

    // Image processing using Sharp
    const sharpInstance = sharp(image);

    sharpInstance.resize(imgOptions.width || undefined, imgOptions.height || undefined);

    // Writing processed file to the output directory
    await fs.writeFile(outputImage, sharpInstance);
  }
  // Directly returns the output image if it exists with no further processing
  return outputImage;
}

export default resizeImg;
