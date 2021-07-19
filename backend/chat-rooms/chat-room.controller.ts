import { Router } from 'express';
import { getChatRoomsByProductId } from './chat-room.service';

const router = Router();

router.get('/:productId', (req, res) => {
  getChatRoomsByProductId(Number(req.params.productId))
    .then((chatRooms) => {
      res.json(chatRooms);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

export default router;
