import { Product } from '../../types';
import FabButton from '../components/main/fab-button';
import View from '../core/view';
import Store from '../core/store';
import { ProductApi } from '../core/api';

const template = `
<div>
  <div id="header" class="header">{{__header__}}</div>
  <div id="MainView__FabButton1"></div>
  <div id="MainView__FabButton2"></div>
  <div id="MainView__FabButton3"></div>
  <div id="MainView__FabButton4"></div>
  <div>{{__products__}}</div>
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
      products.forEach((product) => {
        this.addHtml(`
          <div>${product.subject}</div>
          `);
      });
      this.setTemplateData('products', this.getHtml());
      this.updateView();
      for (let i = 1; i <= 4; i++) {
        const fabButton = new FabButton('#MainView__FabButton' + i, this.store, {});
        fabButton.render();
      }
    });
  }
}
