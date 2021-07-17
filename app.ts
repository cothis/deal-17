import Router from './frontend/core/router';
import { MainView, LoginView, ProductDetailView } from './frontend/page';
import Store from './frontend/core/store';

const store = new Store();

const router = new Router();

const mainView = new MainView('#app', store);
const loginView = new LoginView('#app', store);
const productDetailView = new ProductDetailView('#app', store)

// TODO: 커밋하기 전에 mainView로 바꿔놓기!!!
router.setDefaultPage(productDetailView);

router.route();
