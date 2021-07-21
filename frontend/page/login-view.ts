import HeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../core/store';
import { AnimateType } from '../../types';
import InputComponent from '../components/login/id-input';
import LoginButtonComponent from '../components/login/login-button';
import JoinButtonComponent from '../components/login/join-button';
import { RouterEvent } from '../core/router';
import { UserApi } from '../core/api';

const template: string = `
<div id="loginView" class="login-view">
  <div id="loginView__header" class="header offwhite p-5"></div>
  <div class="container">
    <div id="loginView__inputForm" class="d-flex col p-5"></div>
  </div>
</div>
`;

interface State {
  email: string;
}

export default class LoginView extends View {
  private store: Store;
  private state: State;
  private api: UserApi;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
    this.state = { email: '' };
    this.api = new UserApi();
  }

  render() {
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);
    new HeaderComponent('#loginView__header', this.store, { title: '로그인' }).render();
    new InputComponent('#loginView__inputForm', this.store, {
      placeholder: '아이디를 입력하세요.',
      setState: (value: string) => {
        this.state.email = value;
      },
    }).render();
    new LoginButtonComponent('#loginView__inputForm', this.store, {
      title: '로그인',
      id: 'login',
      onClick: () => {
        this.api
          .getUserByEmail(this.state.email)
          .then((user) => {
            this.store.user = user;
            this.store.observer.notifyObserver(this.store);
            RouterEvent.dispatchEvent('@back');
          })
          .catch(console.error);
      },
    }).render();
    new JoinButtonComponent('#loginView__inputForm', this.store).render();
  }

  setState(store: Store) {}
}
