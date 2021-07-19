import { MainView, LoginView, JoinView, ProductDetailView } from './frontend/page';
import { Router } from './frontend/core/router';
import Store from './frontend/core/store';
import { Link } from './frontend/helper/router-link/router-link';
window.customElements.define('router-link', Link);

const store = new Store();
const router = new Router();

const mainView = new MainView('#app', store);
const loginView = new LoginView('#app', store);
const joinView = new JoinView('#app', store);
const productDetailView = new ProductDetailView('#app', store)

// TODO: 커밋하기 전에 mainView로 바꿔놓기!!!
// router.setDefaultPage(productDetailView);
router.setDefaultPage(mainView);

router.addRoutePath('/login', loginView);
router.addRoutePath('/join', joinView);
router.addRoutePath('/product', productDetailView);
router.route('');
