import { getImage, resizeImg } from '../../utilities/img-handlers';
import * as dotenv from 'dotenv';
import path from 'path';
import ImageOptions from '../../models/image-options';

dotenv.config();

const imgDir = process.env.IMG_DIR || '';

describe('Image handling utilities', (): void => {
  // Valid ImageOptions object
  const imgOptions: ImageOptions = {
    filename: 'fjord',
    width: 200,
    height: 200
  };

  describe('Image reading utility', (): void => {
    // Valid image path
    const imagePath = path.resolve(__dirname, '..', imgDir, `${imgOptions.filename}.jpg`);
    it('returns a buffer from a valid path', async (): Promise<void> => {
      // getImage() function returns an image as Buffer if found, otherwise null.
      const imageBuffer = await getImage(imagePath);
      expect(imageBuffer).not.toBeNull();
    });

    it('returns null from an invalid path', async (): Promise<void> => {
      const imageBuffer = await getImage('/invalid/' + imagePath); //Invalid Image path
      expect(imageBuffer).toBeNull();
    });
  });

  describe('Image resizing utility', (): void => {
    it('resizes an image', async () => {
      // resizeImg() function returns a string path on success or null if unsuccessful
      const outputImage = await resizeImg(imgOptions);
      expect(outputImage).not.toBeNull();
    });

    it('resizes an image with either height or width', async (): Promise<void> => {
      // An ImageOptions object with no height specified
      const outputImage = await resizeImg({
        filename: 'fjord',
        width: 200
      });
      expect(outputImage).not.toBeNull();
    });
  });
});
