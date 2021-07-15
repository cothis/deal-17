import Router from './frontend/core/router';
import LoginView from './frontend/page/login-view';
import { MainView } from './frontend/page';
import Store from './frontend/core/store';

const store = new Store();

const router = new Router();

const mainView = new MainView('#app', store);

const loginView = new LoginView('#app', store);
router.setDefaultPage(mainView);

// router.addRoutePath('another', testAnotherView);
router.route();
