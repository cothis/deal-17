import View from '../../core/view';
import Store from '../../core/store';

const template = `
<button type="button" class="button large link medium my-2">로그인</button>
`;

export default class LoginButtonComponent extends View {
  containerId: string;
  store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.containerId = containerId;
    this.store = store;
  }

  render() {
    this.appendView();
  }
}
