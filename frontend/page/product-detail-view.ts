/**
 * 컴포넌트 순서
 * carousel.ts
 * state.ts
 * title.ts
 * content.ts
 * seller-info.ts
 * footer.ts 
 */

//  import { Product } from '../../types';
 import View from '../core/view';
 import Store from '../core/store';
//  import { ProductApi } from '../core/api';
 
 import Carousel from '../components/product-detail/carousel';
 
 const template = `
 <div class="ProductDetailView">
   <div id="productDetailView__carousel"></div>
 </div>
 `;
 
 export default class ProductDetailView extends View {
   private store: Store;
//    private api: ProductApi;
 
   constructor(selector: string, store: Store) {
     super(selector, template);
     this.store = store;
    //  this.api = new ProductApi('/api/v0/products');
   }
 
   render() {
       this.updateView();
       new Carousel('#productDetailView__carousel', this.store, {}).render();
    //  this.api.getAllProducts().then((products: Product[]) => {
    //    this.updateView();
    //    new Header('#productDetailView__header', this.store, {
    //      showSideView: this.showSideView.bind(this),
    //    }).render();
    //    new ProductList('#productDetailView__productList', this.store, { products }).render();
    //    new FabButton('#productDetailView__fabButton', this.store, {}).render();
    //  });
   }
 }
 