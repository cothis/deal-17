import View from '../../core/view';
import Store from '../../core/store';
import IdInputComponent from './id-input';
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
    new IdInputComponent(this.containerId, this.store).appendView();
    new LoginButtonComponent(this.containerId, this.store).appendView();
    new JoinButtonComponent(this.containerId, this.store).appendView();
  }
}
