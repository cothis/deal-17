import HeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../core/store';
import { AnimateType } from '../../types';
import InputComponent from '../components/login/id-input';
import LoginButtonComponent from '../components/login/login-button';

import { UserApi } from '../core/api';

const template: string = `
<div id="joinView" class="joiv-view">
  <div id="joinView__header" class="header offwhite p-5"></div>
  <div class="container">
    <div id="joinView__inputForm" class="d-flex col p-5">
      <div id="id"></div>
      <div id="town"></div>
      <div id="login" class="d-flex"></div>
    </div>
  </div>
</div>
`;

export interface State {
  id: string;
  town: string;
}

export default class JoinView extends View {
  private store: Store;
  private state: State;
  private api: UserApi;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
    this.state = { id: '', town: '' };
    this.api = new UserApi();
  }

  render() {
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);
    new HeaderComponent('#joinView__header', this.store, { title: '회원가입' }).render();
    new InputComponent('#joinView__inputForm #id', this.store, {
      label: '아이디',
      placeholder: '영문, 숫자 조합 20자 이하',
      regex: /^[A-Za-z0-9+]{1, 20}/,
      setState: (value: string) => {
        this.state.id = value;
      },
    }).render();

    new InputComponent('#joinView__inputForm #town', this.store, {
      label: '우리 동네',
      placeholder: '시•구 제외, 동만 입력',
      setState: (value: string) => {
        this.state.town = value;
      },
    }).render();

    new LoginButtonComponent('#joinView__inputForm #login', this.store, {
      title: '회원가입',
      id: 'join',
      onClick: () => {
        this.api.join(this.state.id, this.state.town).then(console.log);
      },
    }).render();
  }
}
