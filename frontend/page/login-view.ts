import LoginHeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../core/store';
import { AnimateType } from '../../types';
import InputComponent from '../components/login/id-input';
import LoginButtonComponent from '../components/login/login-button';
import JoinButtonComponent from '../components/login/join-button';

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
    new InputComponent('#loginView__inputForm', this.store, { placeholder: '아이디를 입력하세요.' }).render();
    new LoginButtonComponent('#loginView__inputForm', this.store, { title: '로그인' }).render();
    new JoinButtonComponent('#loginView__inputForm', this.store).render();
  }
}
