import HeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../core/store';
import { AnimateType } from '../../types';
import InputComponent from '../components/login/id-input';
import LoginButtonComponent from '../components/login/login-button';

const template: string = `
<div id="joinView" class="joiv-view">
  <div id="joinView__header" class="header offwhite p-5"></div>
  <div class="container">
    <div id="joinView__inputForm" class="d-flex col p-5"></div>
  </div>
</div>
`;

export default class JoinView extends View {
  private store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);
    new HeaderComponent('#joinView__header', this.store, { title: '회원가입' }).render();
    new InputComponent('#joinView__inputForm', this.store, {
      label: '아이디',
      placeholder: '영문, 숫자 조합 20자 이하',
    }).render();

    new InputComponent('#joinView__inputForm', this.store, {
      label: '우리 동네',
      placeholder: '시•구 제외, 동만 입력',
    }).render();

    new LoginButtonComponent('#joinView__inputForm', this.store, { title: '회원가입' }).render();
  }
}
