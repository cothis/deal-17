import InputFormComponent from '../components/login/input-form';
import LoginHeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../store';

const template: string = `
<div id="header" class="header offwhite p-5"></div>
<div class="container">
  <div id="input-form" class="d-flex col p-5"></div>
</div>
`;

export default class LoginView extends View {
  store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }
  render() {
    this.updateView();
    new LoginHeaderComponent('header', this.store).render();
    new InputFormComponent('input-form', this.store).render();
  }
}
