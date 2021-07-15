import View from '../../core/view';
import Store from '../../core/store';
// import { ProductApi } from '../core/api';

const template = `
<div class="header-container flex grow">
    <div class="header-center link medium white flex ai-center jc-center">
      <img src="/frontend/static/images/icons/map-pin.png">
      <div>장소</div>
    </div>
    <div class="header-left">
      <img src="/frontend/static/images/icons/category.png">
    </div>
    <div class="header-right flex">
      <img src="/frontend/static/images/icons/user.png">
      <img id="headerMenu" src="/frontend/static/images/icons/menu.png">
    </div>
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

  onMenuClickHandler() {
    alert('menu');
  }

  render() {
    this.updateView();

    const headerMenu = document.querySelector('#headerMenu');
    headerMenu!.addEventListener('click', this.onMenuClickHandler)
  }
}
