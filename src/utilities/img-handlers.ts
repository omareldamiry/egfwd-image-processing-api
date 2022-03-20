import { promises as fs, existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';
import ImageOptions from '../models/image-options';
import * as dotenv from 'dotenv';

dotenv.config();

const imgDir = process.env.IMG_DIR || '';
const outDir = process.env.OUT_DIR || '';

export async function getImage(inputImagePath: string): Promise<Buffer | null> {
  if (existsSync(inputImagePath)) {
    try {
      const image = await fs.readFile(inputImagePath);
      return image;
    } catch (err) {
      return null;
    }
  }

  return null;
}

export async function resizeImg(imgOptions: ImageOptions): Promise<string | null> {
  const inputImage = path.join(imgDir, `${imgOptions.filename}.jpg`);
  const outputImage = path.join(
    outDir,
    `${imgOptions.filename}_${imgOptions.width || 'unset'}_${imgOptions.height || 'unset'}.jpg`
  );

  if (!existsSync(outputImage)) {
    const image = await getImage(inputImage);

    if (!image) return null;

    const sharpInstance = sharp(image);

    sharpInstance.resize(imgOptions.width || undefined, imgOptions.height || undefined);

    await fs.writeFile(outputImage, sharpInstance);
  }

  return outputImage;
}

export default resizeImg;
