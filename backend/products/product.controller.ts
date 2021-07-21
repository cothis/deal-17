import { camelCase } from 'change-case-object';
import { Router } from 'express';
import { getAllProducts, getMainProducts, getProductById } from './product.service';

const router = Router();

router.get('/', (req, res) => {
  const type = req.query.type;
  if (type === 'main') {
    getMainProducts({
      userId: Number(req.query.userId),
      wishId: Number(req.query.wishId),
      townId: Number(req.query.townId),
      chatRoomId: Number(req.query.chatRoomId),
      categoryId: Number(req.query.categoryId),
      page: Number(req.query.page),
      pageSize: Number(req.query.pageSize),
    })
      .then((products) => res.json(products))
      .catch((e) => {
        console.error(e);
        res.status(500).json({ error: 'SERVER_ERROR' });
      });
  } else {
    getAllProducts()
      .then((result) => res.json(result))
      .catch((e) => {
        console.error(e);
        res.status(500).json({ error: 'SERVER_ERROR' });
      });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(Number(req.params.id));

    res.json(camelCase(product));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

export default router;
