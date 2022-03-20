import express from 'express';
import ImageOptions from '../models/image-options';
import resizeImg from '../utilities/img-handlers';

const routes = express.Router();

routes.get('/image', async (req, res) => {
  const imageOptions: ImageOptions = {
    filename: req.query.filename?.toString(),
    width: parseInt(req.query.width as string),
    height: parseInt(req.query.height as string)
  };

  if (imageOptions.filename) {
    try {
      const resizedImage = resizeImg(imageOptions);
      resizedImage.then((outputImgPath) => {
        if (outputImgPath) {
          res.sendFile(outputImgPath);
        } else {
          res.status(404).send('Image not found');
        }
      });
    } catch (err) {
      res.status(500).send('Oops!');
    }
  } else {
    res.send('Hello, world!');
  }
});

export default routes;
