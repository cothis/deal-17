import { camelCase } from 'change-case-object';
import { Router } from 'express';
import { getAllProducts, getProductById } from './product.service';
import { Upload } from '../uploader';

const upload = Upload('products');
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

router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    console.log({ ...req.body });
    console.log(req.body);
    console.log(req.body.subject);
    console.log(req.files);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

export default router;
