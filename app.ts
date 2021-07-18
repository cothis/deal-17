import { Router } from './frontend/core/router';
import LoginView from './frontend/page/login-view';
import { MainView } from './frontend/page';
import Store from './frontend/core/store';
import { Link } from './frontend/helper/router-link/router-link';
window.customElements.define('router-link', Link);

const store = new Store();

const router = new Router();

const mainView = new MainView('#app', store);

const loginView = new LoginView('#app', store);
router.setDefaultPage(mainView);
router.addRoutePath('/login', loginView);
// router.addRoutePath('another', testAnotherView);
router.route('');
