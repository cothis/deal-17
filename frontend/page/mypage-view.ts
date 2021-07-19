import HeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../core/store';
import { AnimateType } from '../../types';
import InputComponent from '../components/login/id-input';
import LoginButtonComponent from '../components/login/login-button';
import JoinButtonComponent from '../components/login/join-button';
import { RouterEvent } from '../core/router';
import MainView from './main-view';

const template: string = `
<div class="d-flex col">
  <div id="mypageView__header" class="header offwhite p-5"></div>
  <div class="container">
    <div id="myPage" class="d-flex col p-5">
      <span>{{__username__}}</span>
    </div>
  </div>
</div>
`;

export default class MyPageView extends View {
  private store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.setTemplateData('username', 'test user');
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);
    new HeaderComponent('#mypageView__header', this.store, { title: '내 계정' }).render();
    new LoginButtonComponent('#myPage', this.store, { title: '로그아웃', id: 'logout' }).render();

    this.container.querySelector('#logout')?.addEventListener('click', (e) => {
      RouterEvent.dispatchEvent('@back');
    });
  }
}
