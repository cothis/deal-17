import { Router } from './frontend/core/router';
import { MainView, LoginView, JoinView } from './frontend/page';
import Store from './frontend/core/store';

const store = new Store();
const router = new Router();

const mainView = new MainView('#app', store);
const loginView = new LoginView('#app', store);
const joinView = new JoinView('#app', store);

router.setDefaultPage(mainView);
router.addRoutePath('/login', loginView);
router.addRoutePath('/join', joinView);
router.route('');
