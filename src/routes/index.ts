import express from 'express';
import ImageOptions from '../models/image-options';
import resizeImg from '../utilities/img-handlers';

const routes = express.Router();

routes.get('/image', async (req: express.Request, res: express.Response): Promise<void> => {
  // Saving URL query parameters in ImageOptions
  const imageOptions: ImageOptions = {
    filename: req.query.filename?.toString(),
    width: parseInt(req.query.width as string),
    height: parseInt(req.query.height as string)
  };

  // Checks if a file is being specified
  if (imageOptions.filename) {
    try {
      // resizeImg() function returns a path to the output file or null.
      const resizedImage = resizeImg(imageOptions);
      resizedImage.then((outputImgPath) => {
        // Checks whether outputImgPath exists
        if (outputImgPath) {
          res.sendFile(outputImgPath);
        } else {
          // Sends a 404 'Not Found' response
          res.status(404).send('Image not found');
        }
      });
    } catch (err) {
      // Server error response
      res.status(500).send('Oops!');
    }
  } else {
    // Default response (when no file is specified in filename)
    res.send('Hello, world!');
  }
});

export default routes;
