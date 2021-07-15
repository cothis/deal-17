import Router from './frontend/core/router';
import { MainView } from './frontend/page';
import Store from './frontend/core/store';

const store = new Store();

const router = new Router();

const mainView = new MainView('app', store);

router.setDefaultPage(mainView);

// router.addRoutePath('another', testAnotherView);
router.route();
