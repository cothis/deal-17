/**
 * 컴포넌트 순서
 * carousel.ts
 * state.ts
 * title.ts
 * content.ts
 * seller-info.ts
 * footer.ts
 */

import { Product, Picture } from '../../types';
import View from '../core/view';
import Store from '../core/store';
import { PictureApi, ProductApi } from '../core/api';
import { AnimateType } from '../../types';
import { convertToMarketPrice } from '../helper/numberHelper';

import Carousel from '../components/product-detail/carousel';
import State from '../components/product-detail/state';
import Title from '../components/product-detail/title';
import Content from '../components/product-detail/content';
import SellerInfo from '../components/product-detail/seller-info';
import Footer from '../components/product-detail/footer';

import '../../static/styles/product-detail.css';

const template = `
 <div class="ProductDetailView">
   <div id="productDetailView__carousel" class="overflow-hidden"></div>
   <div class="x-py-24 x-px-16">
    <div id="productDetailView__state"></div>
    <div id="productDetailView__title" class="x-mt-16"></div>
    <div id="productDetailView__content" class="x-mt-16"></div>
    <div id="productDetailView__seller-info" class="x-mt-24"></div>
   </div>
   <div id="productDetailView__footer"></div>
 </div>
 `;

export default class ProductDetailView extends View {
  private store: Store;
  private pictureApi: PictureApi;
  private productApi: ProductApi;

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    this.pictureApi = new PictureApi();
    this.productApi = new ProductApi();
  }

  render(remainUrl?: string) {
    const productId = Number(remainUrl?.substr(1, 1));
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);
    this.pictureApi.getPicturesByProductId(1).then((pictures: Picture[]) => {
      new Carousel('#productDetailView__carousel', this.store, { pictures }).render();
    });
    this.productApi.getProductById(productId).then((product: Product) => {
      console.log(product);
      new State('#productDetailView__state', this.store, { state: product.state }).render();
      new Title('#productDetailView__title', this.store, {
        subject: product.subject,
        category: '기타 중고물품',
        createdAt: '4시간 전',
      }).render();
      new Content('#productDetailView__content', this.store, { content: product.content ?? '' }).render();
      new SellerInfo('#productDetailView__seller-info', this.store, {
        sellerEmail: '테스트유저',
        sellerTown: '역삼동',
      }).render();
      new Footer('#productDetailView__footer', this.store, {
        isWish: false,
        price: convertToMarketPrice(product.price) ?? '가격미정',
        chatRoomCount: 2,
      }).render();
    });
  }
}
