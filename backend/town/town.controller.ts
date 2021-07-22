import { Router } from 'express';
import {
  addUserTown,
  deleteUserTown,
  getTownsByUserId,
  setActiveTown,
  setActiveTownByEachId,
} from '../user-town/user-town.service';
import { getOrAddTown, getTownByUserTownId } from './town.service';

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
      .then((town) => addUserTown(userId, town.id, 0))
      .then(getTownByUserTownId)
      .then((town) => res.json({ result: true, town }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { userId, townId } = req.body;
    if (!userId) throw new Error('유저 아이디가 필요합니다.');
    if (!townId) throw new Error('동네 아이디가 필요합니다.');

    getTownsByUserId(userId)
      .then((towns) => {
        const town = towns.find((town) => town.id != townId);
        if (town) setActiveTownByEachId(userId, town.id, 1);
        else throw new Error('잔여 동네가 없습니다.');
      })
      .then(() => deleteUserTown(userId, townId))
      .then((result) => res.json({ result }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
