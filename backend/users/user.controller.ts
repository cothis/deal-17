import { Router } from 'express';
import { getUserById, join } from './user.service';
import { getOrAddTown } from '../town/town.service';
import { Town, UserTown } from '../../types';
import { addUserTown } from '../user-town/user-town.service';

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

router.post('/', (req, res) => {
  Promise.all<number, Town>([join(req.body.email), getOrAddTown(req.body.town)])
    .then(([userId, town]) => addUserTown(userId, town.id))
    .then((userTownId) => res.json({ userTownId }))
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

export default router;
