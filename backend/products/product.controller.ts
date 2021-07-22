import { camelCase } from 'change-case-object';
import { Router } from 'express';
import { createProduct, getAllProducts, getProductById } from './product.service';
import { Upload } from '../uploader';
import { createPictures } from '../pictures/picture.service';

const upload = Upload('products');
const router = Router();

router.get('/', async (_, res) => {
  try {
    const allProducts = await getAllProducts();

    res.json(camelCase(allProducts));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req);

    res.json(camelCase(product));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    console.log(req.body);
    const { subject, price, categoryId, content, sellerId } = req.body;
    console.log(subject, price, categoryId, content, sellerId);

    const productId = await createProduct({
      subject,
      price: parseInt(price),
      categoryId: parseInt(categoryId),
      content,
      sellerId: parseInt(sellerId),
    });

    console.log(req.files);
    const pictureId = createPictures(req, productId);

    res.json({ result: 'ok', productId, pictureId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

export default router;
