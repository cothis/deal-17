import { Router } from 'express';
import { getPicturesById } from './picture.service';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const pictures = await getPicturesById(req);

    res.json(pictures);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

export default router;
