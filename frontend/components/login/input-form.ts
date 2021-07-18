import View from '../../core/view';
import Store from '../../core/store';
import InputComponent from './id-input';
import JoinButtonComponent from './join-button';
import LoginButtonComponent from './login-button';

const template = ``;

export default class InputFormComponent extends View {
  containerId: string;
  store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.containerId = containerId;
    this.store = store;
  }

  render() {
    new InputComponent(this.containerId, this.store, { placeholder: '아이디를 입력하세요.' }).render();
    new LoginButtonComponent(this.containerId, this.store, { title: '로그인' }).render();
    new JoinButtonComponent(this.containerId, this.store).render();
  }
}
