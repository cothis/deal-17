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
} from './frontend/page';
import { Router } from './frontend/core/router';
import Store from './frontend/core/store';
import { Link } from './frontend/helper/router-link/router-link';
import { CategoryItem } from './frontend/components/category/category-item.component';
window.customElements.define('router-link', Link);
window.customElements.define('category-item', CategoryItem);

const store = new Store();
const router = new Router();

const mainView = new MainView('#app', store);
const loginView = new LoginView('#app', store);
const joinView = new JoinView('#app', store);
const productDetailView = new ProductDetailView('#app', store);
const writeView = new WriteView('#app', store);
const mypageView = new MypageView('#app', store);
const categoryView = new CategoryView('#app', store);
const townView = new TownView('#app', store);
const chattingListView = new ChattingListView('#app', store);

router.setDefaultPage(chattingListView);
// router.setDefaultPage(mainView);

router.addRoutePath('/login', loginView);
router.addRoutePath('/join', joinView);
router.addRoutePath('/product', productDetailView);
router.addRoutePath('/write', writeView);
router.addRoutePath('/mypage', mypageView);
router.addRoutePath('/category', categoryView);
router.addRoutePath('/town', townView);
router.addRoutePath('/chat', chattingListView);

router.route('');
