import { Product, Picture } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';
import { ProductApi, ChatRoomApi, WishApi } from '../../core/api';
import { AnimateType } from '../../../types';

import SelectPopup from '../../components/common/select-popup';

import Header from '../../components/common/header-offwhite';
import MenuBar from '../../components/menu/menu-bar';
import ProductList from '../../components/common/product-list';

import './menu-view.css';

const template = `
 <div class="menu-view">
   <div id="MenuView__header"></div>
   <div id="MenuView__menu-bar"></div>
   <div id="MenuView__content"></div>
 </div>
 `;

enum MenuId {
  SALE = 0,
  CHAT = 1,
  WISH = 2,
}

enum MenuLabel {
  SALE = '판매목록',
  CHAT = '채팅',
  WISH = '관심목록',
}

export default class MenuView extends View {
  private store: Store;
  private productApi: ProductApi;
  private activeMenuId: number;
  private menuBar!: MenuBar;

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    this.productApi = new ProductApi();
    this.activeMenuId = MenuId.SALE;
  }

  isActive(id: number) {
    return this.activeMenuId === id;
  }

  onClick(id: number) {
    switch (id) {
      case MenuId.SALE:
        this.activeMenuId = MenuId.SALE;
        break;
      case MenuId.CHAT:
        this.activeMenuId = MenuId.CHAT;
        break;
      case MenuId.WISH:
        this.activeMenuId = MenuId.WISH;
        break;
    }
  }

  render() {
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);

    new Header('#MenuView__header', this.store, { title: '메뉴' }).render();
    this.menuBar = new MenuBar('#MenuView__menu-bar', this.store, {
      items: [
        { id: MenuId.SALE, label: MenuLabel.SALE, active: this.isActive(MenuId.SALE) },
        { id: MenuId.CHAT, label: MenuLabel.CHAT, active: this.isActive(MenuId.CHAT) },
        { id: MenuId.WISH, label: MenuLabel.WISH, active: this.isActive(MenuId.WISH) },
      ],
      onClick: this.onClick.bind(this),
    });
    this.menuBar.render();

    this.productApi.getAllProducts().then((products: Product[]) => {
      new ProductList('#MenuView__content', this.store, { products }).render();
    });
  }

  setState(store: Store) {}
}
