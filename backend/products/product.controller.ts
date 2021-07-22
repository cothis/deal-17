import { camelCase } from 'change-case-object';
import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getMainProducts,
  getProductById,
  getProductDetail,
  increaseViewCount,
  updateProductById,
  updateProductState,
} from './product.service';
import { createPictures } from '../pictures/picture.service';
import { Upload } from '../uploader';

const upload = Upload('products');
const router = Router();

router.get('/', (req, res) => {
  const type = req.query.type;

  if (type === 'view') {
    console.log(req.query);
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

router.patch('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const productId = req.params.id;
    const { subject, price, categoryId, content, sellerId } = req.body;

    const result = await updateProductById(
      {
        subject,
        price: parseInt(price),
        categoryId: parseInt(categoryId),
        content,
        sellerId: parseInt(sellerId),
      },
      productId
    );
    if (result) {
      res.json({ result: 'ok' });
    } else throw new Error('업데이트 결과 실패');
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const { subject, price, categoryId, content, sellerId } = req.body;
    const productId = await createProduct({
      subject,
      price: parseInt(price),
      categoryId: parseInt(categoryId),
      content,
      sellerId: parseInt(sellerId),
    });

    const pictureId = createPictures(req, productId);
    res.json({ result: 'ok', productId, pictureId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.put('/:id/state', (req, res) => {
  const id = Number(req.params.id);
  const state = Number(req.body.state);

  updateProductState(id, state)
    .then(() => res.json({}))
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: 'SERVER_ERROR' });
    });
});

export default router;
