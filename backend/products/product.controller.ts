import { Router } from 'express';
import { getAllProducts, getProductById } from './product.service';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const allProducts = await getAllProducts();

    res.json(allProducts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req);

    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

export default router;
