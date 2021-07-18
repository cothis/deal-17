import { Router } from 'express';
import { getPicturesByProductId } from './picture.service';

const router = Router();

router.get('/:productId', async (productId, res) => {
  try {
    const pictures = await getPicturesByProductId(productId);

    res.json(pictures);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

export default router;
