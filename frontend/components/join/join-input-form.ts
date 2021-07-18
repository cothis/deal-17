import View from '../../core/view';
import Store from '../../core/store';
import InputComponent from '../login/id-input';
import JoinButtonComponent from '../login/join-button';
import LoginButtonComponent from '../login/login-button';

const template = ``;

export default class JoinInputFormComponent extends View {
  containerId: string;
  store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.containerId = containerId;
    this.store = store;
  }

  render() {
    new InputComponent(this.containerId, this.store, {
      label: '아이디',
      placeholder: '영문, 숫자 조합 20자 이하',
    }).render();

    new InputComponent(this.containerId, this.store, {
      label: '우리 동네',
      placeholder: '시•구 제외, 동만 입력',
    }).render();

    new LoginButtonComponent(this.containerId, this.store, { title: '회원가입' }).render();
  }
}
