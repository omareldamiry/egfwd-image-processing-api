import { getImage, resizeImg } from '../../utilities/img-handlers';
import * as dotenv from 'dotenv';
import path from 'path';
import ImageOptions from '../../models/image-options';

dotenv.config();

const imgDir = process.env.IMG_DIR || '';

describe('Image handling utilities', () => {
  const imgOptions: ImageOptions = {
    filename: 'fjord',
    width: 200,
    height: 200
  };

  describe('Image reading utility', () => {
    const imagePath = path.join(imgDir, `${imgOptions.filename}.jpg`);
    it('returns a buffer from a valid path', async () => {
      const imageBuffer = await getImage(imagePath);
      expect(imageBuffer).not.toBeNull();
    });

    it('returns null from an invalid path', async () => {
      const imageBuffer = await getImage('/invalid/' + imagePath);
      expect(imageBuffer).toBeNull();
    });
  });

  describe('Image resizing utility', () => {
    it('resizes an image', async () => {
      const outputImage = await resizeImg(imgOptions);
      expect(outputImage).not.toBeNull();
    });

    it('resizes an image with either height or width', async () => {
      const outputImage = await resizeImg({
        filename: 'fjord',
        width: 200
      });
      expect(outputImage).not.toBeNull();
    });
  });
});
