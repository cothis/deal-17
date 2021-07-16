import InputFormComponent from '../components/login/input-form';
import LoginHeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../core/store';
import { SideViewType } from './main-view';

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

  show() {
    this.root!.classList.add('login-view__visible');
  }

  hide() {
    this.root!.classList.remove('login-view__visible')
  }

  render() {
    this.updateView();
    new LoginHeaderComponent('#loginView__header', this.store).render();
    new InputFormComponent('#loginView__inputForm', this.store).render();

    this.root = document.querySelector('#loginView');
    this.root!.addEventListener('click', () => this.hide())
  }
}
