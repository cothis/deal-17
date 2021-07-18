/**
 * 컴포넌트 순서
 * carousel.ts
 * state.ts
 * title.ts
 * content.ts
 * seller-info.ts
 * footer.ts
 */

import { Picture } from '../../types';
import View from '../core/view';
import Store from '../core/store';
import { PictureApi } from '../core/api';

import Carousel from '../components/product-detail/carousel';

const template = `
 <div class="ProductDetailView">
   <div id="productDetailView__carousel"></div>
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
    this.pictureApi.getPicturesByProductId(1).then((pictures: Picture[]) => {
      this.updateView();
      new Carousel('#productDetailView__carousel', this.store, { pictures }).render();
    });
  }
}
