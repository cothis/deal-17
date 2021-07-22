import { Router } from 'express';
import { getUserById, getUserByEmail, join } from './user.service';
import { getOrAddTown } from '../town/town.service';
import { Town, UserTown } from '../../types';
import { addUserTown, setActiveTown } from '../user-town/user-town.service';
import { RouterEvent } from '../../frontend/core/router';

const router = Router();

router.get('/session', (req, res) => {
  console.log(req.session);
  res.json(req.session.user);
});

router.get('/:id', (req, res) => {
  if (req.params.id === 'search') {
    getUserByEmail(String(req.query.email))
      .then((user) => {
        req.session.user = user;
        req.session.save(() => {
          console.log(req.session);
          res.json(user);
        });
      })
      .catch((err: Error) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  } else {
    getUserById(Number(req.params.id))
      .then((user) => {
        res.json(user);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ error: 'SERVER_ERROR' });
      });
  }
});

router.post('/', (req, res) => {
  Promise.all<number, Town>([join(req.body.email), getOrAddTown(req.body.town)])
    .then(([userId, town]) => addUserTown(userId, town.id, 1))
    .then((userTownId) => res.json({ userTownId }))
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

export default router;
