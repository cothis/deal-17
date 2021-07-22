import { Router } from 'express';
import { getTownsByUserId } from '../user-town/user-town.service';

const router = Router();

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

export default router;
