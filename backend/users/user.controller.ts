import { Router } from 'express';
import { User } from '../../types';
import { getUserById } from './user.service';

const router = Router();

router.get('/:id', (req, res) => {
  getUserById(Number(req.params.id))
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

export default router;
