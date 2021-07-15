import { Product } from '../../types';
import View from '../core/view';
import Store from '../core/store';
import { ProductApi } from '../core/api';

import Header from '../components/common/header';
import ProductList from '../components/common/product-list';
import FabButton from '../components/main/fab-button';

const template = `
<div class="MainView">
  <div id="mainView__header" class="header p-5"></div>
  <div id="mainView__productList"></div>
  <div id="mainView__fabButton"></div>
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
      new Header('#mainView__header', this.store).render();
      new ProductList('#mainView__productList', this.store, { products }).render();
      new FabButton('#mainView__fabButton', this.store, {}).render();
    });
  }
}
