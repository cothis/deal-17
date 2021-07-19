import { Router } from 'express';
import { getWishesByUserId } from './wish.service';

const router = Router();

router.get('/:userId', (req, res) => {
  getWishesByUserId(Number(req.params.userId))
    .then((wishes) => {
      res.json(wishes);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

export default router;
