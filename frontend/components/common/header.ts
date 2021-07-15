import View from '../../core/view';
import Store from '../../core/store';
// import { ProductApi } from '../core/api';

const template = `
<div class="header">
    hi
</div>
`;

export default class Header extends View {
  private store: Store;
//   private api: ProductApi;

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    // this.api = new ProductApi('/api/v0/products');
  }

  render() {
    this.updateView();
  }
}
