import InputFormComponent from '../components/login/input-form';
import LoginHeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../core/store';
import { SideViewType } from './main-view';
import { AnimateType } from '../../types';

const template: string = `
<div id="loginView" class="login-view">
  <div id="loginView__header" class="header offwhite p-5"></div>
  <div class="container">
    <div id="loginView__inputForm" class="d-flex col p-5"></div>
  </div>
</div>
`;

export default class LoginView extends View {
  private store: Store;
  private root: HTMLElement | null = null;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);
    new LoginHeaderComponent('#loginView__header', this.store, { title: '로그인' }).render();
    new InputFormComponent('#loginView__inputForm', this.store).render();
  }
}
