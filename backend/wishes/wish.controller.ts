import { Router } from 'express';
import { getWishesByUserId, toggleWish } from './wish.service';

const router = Router();

router.get('/:userId', (req, res) => {
  const userId = Number(req.body.userId);

  getWishesByUserId(userId)
    .then((wishes) => res.json(wishes))
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

router.put('/', (req, res) => {
  const userId = Number(req.body.userId);
  const productId = Number(req.body.productId);

  toggleWish(userId, productId)
    .then(() => res.end())
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

export default router;
