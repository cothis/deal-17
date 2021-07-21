import { camelCase } from 'change-case-object';
import { Router } from 'express';
import {
  getAllProducts,
  getMainProducts,
  getProductById,
  getProductDetail,
  increaseViewCount,
} from './product.service';

const router = Router();

router.get('/', (req, res) => {
  const type = req.query.type;

  if (type === 'view') {
    getMainProducts({
      userId: Number(req.query.userId),
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

router.get('/:id', (req, res) => {
  const type = req.query.type;
  const userId = Number(req.query.userId);
  const productId = Number(req.params.id);

  if (type === 'view') {
    getProductDetail({ userId, productId: productId })
      .then((product) => res.json(product))
      .catch((e) => {
        console.error(e);
        res.status(500).json({ error: 'SERVER_ERROR' });
      });
    increaseViewCount(productId);
  } else {
    getProductById(productId)
      .then((result) => res.json(result))
      .catch((e) => {
        console.error(e);
        res.status(500).json({ error: 'SERVER_ERROR' });
      });
  }
});

export default router;
