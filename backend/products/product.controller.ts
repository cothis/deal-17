import { Router } from 'express';
import { getAllProducts } from './product.service';

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

export default router;
