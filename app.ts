import Router from './frontend/core/router';
import { TestView, TestAnotherView } from './frontend/page';
import MainView from './frontend/page/main-view';
import Store from './frontend/store';
import { User } from './types';

const store = new Store();
store.user = {
  id: 1,
  email: 'chae@test.com',
};

const router = new Router();
const mainView = new MainView('app', store);
const testView = new TestView('app', store);
const testAnotherView = new TestAnotherView('app', store);

router.setDefaultPage(mainView);

router.addRoutePath('another', testAnotherView);
router.route();
