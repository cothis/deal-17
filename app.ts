import {
  MainView,
  LoginView,
  JoinView,
  ProductDetailView,
  WriteView,
  MypageView,
  CategoryView,
  TownView,
  ChattingListView,
  MenuView,
  ChattingDetailView,
  ModifyView,
} from './frontend/page';
import { Router } from './frontend/core/router';
import Store from './frontend/core/store';
import { Link } from './frontend/helper/router-link/router-link';
import { CategoryItem } from './frontend/components/category/category-item.component';
import { TownViewElement } from './frontend/page/town-view/town-view.custom';
import { SessionApi } from './frontend/core/api';

window.customElements.define('router-link', Link);
window.customElements.define('category-item', CategoryItem);
window.customElements.define('town-button', TownViewElement);

const store = new Store();
const router = new Router(store);
const sessionApi = new SessionApi();

const mainView = new MainView('#app', store);
const loginView = new LoginView('#app', store);
const joinView = new JoinView('#app', store);
const productDetailView = new ProductDetailView('#app', store);
const writeView = new WriteView('#app', store);
const mypageView = new MypageView('#app', store);
const categoryView = new CategoryView('#app', store);
const townView = new TownView('#app', store);
const chattingListView = new ChattingListView('#app', store);
const menuView = new MenuView('#app', store);
const chattingDetailView = new ChattingDetailView('#app', store);
const modifyView = new ModifyView('#app', store);

router.setDefaultPage(mainView);

router.addRoutePath('/login', loginView);
router.addRoutePath('/join', joinView);
router.addRoutePath('/product', productDetailView);
router.addRoutePath('/write', writeView);
router.addRoutePath('/mypage', mypageView);
router.addRoutePath('/category', categoryView);
router.addRoutePath('/town', townView);
router.addRoutePath('/chat/detail', chattingDetailView);
router.addRoutePath('/chat', chattingListView);
router.addRoutePath('/menu', menuView);
router.addRoutePath('/modify', modifyView);

store.observer.registerObserver(mainView);
store.observer.registerObserver(loginView);
store.observer.registerObserver(joinView);
store.observer.registerObserver(productDetailView);
store.observer.registerObserver(writeView);
store.observer.registerObserver(mypageView);
store.observer.registerObserver(categoryView);
store.observer.registerObserver(townView);
store.observer.registerObserver(chattingListView);
store.observer.registerObserver(menuView);
store.observer.registerObserver(chattingDetailView);
store.observer.registerObserver(modifyView);

sessionApi
  .getSession()
  .then((result) => {
    store.user = result;
    router.route('');
  })
  .catch((err) => {
    console.log('로그아웃 상태입니다.');
    router.route('');
  });
