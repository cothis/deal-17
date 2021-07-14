import Router from './core/router';
import { TestView, TestAnotherView } from './page';

const router = new Router();

const testView = new TestView('app');
const testAnotherView = new TestAnotherView('app');

router.setDefaultPage(testView);

router.addRoutePath('another', testAnotherView);
router.route();
