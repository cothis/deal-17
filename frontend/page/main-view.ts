import { Product } from '../../types';
import View from '../core/view';
import Store from '../core/store';
import { ProductApi } from '../core/api';

import Header from '../components/common/header';
import ProductList from '../components/common/product-list';
import FabButton from '../components/main/fab-button';
import LoginView from './login-view';
import { Link } from '../helper/router-link/router-link';

const template = `
<div class="MainView">
  <div id="mainView__header" class="header p-5"></div>
  <div id="mainView__productList"></div>
  <div id="mainView__fabButton"></div>
  <div id="mainView__sidePanel"></div>
</div>
`;

export enum SideViewType {
  USER,
  MENU,
  CATEGORY,
}

export default class MainView extends View {
  private store: Store;
  private api: ProductApi;
  private loginView?: LoginView;

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    this.api = new ProductApi();
  }

  render() {
    this.api.getAllProducts({ type: 'view', userId: 1 }).then((products: Product[]) => {
      this.appendView();
      new Header('#mainView__header', this.store, {}).render();
      new ProductList('#mainView__productList', this.store, { products }).render();
      new FabButton('#mainView__fabButton', this.store, {}).render();
    });
  }

  onStoreChange() {
    if (this.pageContainer) {
      const routerLink: Link | null = this.pageContainer.querySelector('#user');
      if (routerLink) {
        routerLink.setAttribute('to', this.store.user ? '/mypage' : '/login');
      }
    }
  }
}
