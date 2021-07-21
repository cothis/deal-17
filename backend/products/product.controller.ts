import { camelCase } from 'change-case-object';
import { Router } from 'express';
import { getAllProducts, getProductById } from './product.service';
import { Upload } from '../uploader';
import multer from 'multer';

const getBody = multer();
const router = Router();

router.get('/', async (_, res) => {
  try {
    const allProducts = await getAllProducts();

    res.json(camelCase(allProducts));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req);

    res.json(camelCase(product));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.post('/', getBody.none(), async (req, res) => {
  console.log(req.headers);
  console.log(req.body.subject, req.body.price, req.body.category, req.body.content);
  console.log(req.files);

  const id = 1;
  const upload = Upload(`products/${id}`);
  const productsUploader = upload.array('images', 10);

  productsUploader(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'SERVER_ERROR' });
    } else {
      res.json({ result: 'ok' });
    }
  });
});

export default router;
