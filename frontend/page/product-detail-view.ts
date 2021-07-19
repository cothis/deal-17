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
import { PictureApi } from '../core/api';
import { AnimateType } from '../../types';

import Carousel from '../components/product-detail/carousel';
import State from '../components/product-detail/state';
import Title from '../components/product-detail/title';
import Content from '../components/product-detail/content';
import SellerInfo from '../components/product-detail/seller-info';
import Footer from '../components/product-detail/footer';

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

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    this.pictureApi = new PictureApi();
  }

  render() {
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);
    this.pictureApi.getPicturesByProductId(1).then((pictures: Picture[]) => {
      new Carousel('#productDetailView__carousel', this.store, { pictures }).render();
      new State('#productDetailView__state', this.store, { }).render();
      new Title('#productDetailView__title', this.store, { }).render();
      new Content('#productDetailView__content', this.store, { }).render();
      new SellerInfo('#productDetailView__seller-info', this.store, { }).render();
      new Footer('#productDetailView__footer', this.store, {}).render();
    });
  }
}
