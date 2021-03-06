import { Router } from 'express';
import { getChatRoomById, getChatRoomsByProductId } from './chat-room.service';

const router = Router();

router.get('/:productId', (req, res) => {
  getChatRoomsByProductId(Number(req.params.productId))
    .then((chatRooms) => res.json(chatRooms))
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

router.get('/detail/:id', (req, res) => {
  getChatRoomById(Number(req.params.id))
    .then((chatRoom) => res.json(chatRoom))
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

export default router;
