import { Product } from '../../types';
import FabButton from '../components/main/fab-button';
import View from '../core/view';
import Store from '../core/store';
import { ProductApi } from '../core/api';
import Header from '../components/common/header';
import { ProductComponent } from '../components/common/product';

const template = `
<div>
  <div id="header"></div>
  <div id="products">{{__products__}}</div>
  <div id="MainView__FabButton"></div>
</div>
`;

export default class MainView extends View {
  private store: Store;
  private api: ProductApi;

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    this.api = new ProductApi('/api/v0/products');
  }

  render() {
    this.api.getAllProducts().then((products: Product[]) => {
      this.updateView();

      new Header('#header', this.store).render();

      products.forEach((product) => {
        new ProductComponent('#products', this.store, { product }).render();
      });

      new FabButton('#MainView__FabButton', this.store, {}).render();
    });
  }
}
