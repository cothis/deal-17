import { Product, Picture, ChatRoom } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';
import { ProductApi, ChatRoomApi, WishApi } from '../../core/api';
import { AnimateType } from '../../../types';

import SelectPopup from '../../components/common/select-popup';

import Header from '../../components/common/header-offwhite';
import MenuBar from '../../components/menu/menu-bar';
import ProductList from '../../components/common/product-list';
import chattingListComponent from '../../components/common/chatting-list';

import './menu-view.css';

const template = `
 <div class="zindex-100 menu-view">
   <div id="menuView__header"></div>
   <div id="menuView__menu-bar"></div>
   <div id="menuView__content"></div>
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

export default class menuView extends View {
  private store: Store;
  private productApi: ProductApi;
  private chatRoomApi: ChatRoomApi;
  private activeMenuId: number;
  private menuBar!: MenuBar;

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    this.productApi = new ProductApi();
    this.activeMenuId = MenuId.SALE;
    this.chatRoomApi = new ChatRoomApi();
  }

  isActive(id: number) {
    return this.activeMenuId === id;
  }

  onClick(id: number) {
    switch (id) {
      case MenuId.SALE:
        this.activeMenuId = MenuId.SALE;
        this.showProductList();
        break;
      case MenuId.CHAT:
        this.activeMenuId = MenuId.CHAT;
        this.showChattingList();
        break;
      case MenuId.WISH:
        this.activeMenuId = MenuId.WISH;
        this.showWishList();
        break;
    }
  }

  showProductList() {
    const products = this.store.products.filter((e) => e.sellerId === this.store.user!.id);
    console.log(products);
    new ProductList('#menuView__content', this.store, { products, viewName: 'menuView' }).render();
  }

  showChattingList() {
    this.chatRoomApi.getChatRoomByProductId(1).then((chatRooms: ChatRoom[]) => {
      new chattingListComponent('#menuView__content', this.store, {
        chatRooms,
      }).render();
    });
  }

  showWishList() {
    const products = this.store.products.filter((e) => e.userWish === true);
    console.log(products);
    new ProductList('#menuView__content', this.store, { products, viewName: 'menuView' }).render();
  }

  render() {
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);

    new Header('#menuView__header', this.store, { title: '메뉴' }).render();
    this.menuBar = new MenuBar('#menuView__menu-bar', this.store, {
      items: [
        { id: MenuId.SALE, label: MenuLabel.SALE, active: this.isActive(MenuId.SALE) },
        { id: MenuId.CHAT, label: MenuLabel.CHAT, active: this.isActive(MenuId.CHAT) },
        { id: MenuId.WISH, label: MenuLabel.WISH, active: this.isActive(MenuId.WISH) },
      ],
      onClick: this.onClick.bind(this),
    });
    this.menuBar.render();

    this.showProductList();
  }
}
