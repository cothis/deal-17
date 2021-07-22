import { Product, Picture } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';
import { PictureApi, ProductApi } from '../../core/api';
import { AnimateType } from '../../../types';
import { convertToMarketPrice } from '../../helper/numberHelper';

import SelectPopup from '../../components/common/select-popup';

import HeaderInvisible from '../../components/product-detail/header-invisible';
import Carousel from '../../components/product-detail/carousel';
import State from '../../components/product-detail/state';
import Title from '../../components/product-detail/title';
import Content from '../../components/product-detail/content';
import SellerInfo from '../../components/product-detail/seller-info';
import Footer from '../../components/product-detail/footer';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
 <div id="productDetailView" class="product-detail">
   <div id="productDetailView__carousel" class="overflow-hidden"></div>
   <div id="productDetailView__header-invisible"></div>
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
      new HeaderInvisible('#productDetailView__header-invisible', this.store, {}).render();
    });
    this.productApi.getProductById(productId, { type: 'view', userId: 1 }).then((product: Product) => {
      console.log(product);

      new State('#productDetailView__state', this.store, {
        state: product.state,
        onChange: (state: number) => {
          this.productApi.updateProductState(productId, state);
        },
      }).render();
      new Title('#productDetailView__title', this.store, {
        subject: product.subject,
        category: product.category.name,
        createdAt: product.createdAt,
      }).render();
      new Content('#productDetailView__content', this.store, {
        content: product.content ?? '',
        chatRooms: product.chatRooms,
        wishes: product.wishes,
        views: product.views,
      }).render();
      new SellerInfo('#productDetailView__seller-info', this.store, {
        sellerEmail: product.seller.email,
        sellerTown: product.townName,
      }).render();
      new Footer('#productDetailView__footer', this.store, {
        isWish: product.userWish,
        price: convertToMarketPrice(product.price) ?? '가격미정',
        chatRoomCount: product.chatRooms,
      }).render();
    });
  }
}
