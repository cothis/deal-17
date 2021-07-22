import { Router } from 'express';
import { addUserTown, getTownsByUserId } from '../user-town/user-town.service';
import { getOrAddTown } from './town.service';

const router = Router();

router.get('/search', (req, res) => {
  try {
    const name = req.query.name;
    if (!name) throw new Error('동네 이름을 입력해야 합니다.');

    getOrAddTown(String(name)).then((town) => {
      res.json(town);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) throw new Error('유저 ID가 필요합니다.');

    getTownsByUserId(parseInt(String(userId))).then((user) => {
      res.json(user);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { userId, townName } = req.body;
    if (!userId) throw new Error('유저 아이디가 필요합니다.');
    if (!townName) throw new Error('동네 이름이 필요합니다.');

    getOrAddTown(String(townName))
      .then((town) => {
        addUserTown(userId, town.id);
      })
      .then((userTownId) => {
        res.json({ result: true, userTownId });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
