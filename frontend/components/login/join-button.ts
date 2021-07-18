import View from '../../core/view';
import Store from '../../core/store';

const template = `
<a href="/join" class="bg-transparent my-5 align-self-center">회원가입</a>
`;

export default class JoinButtonComponent extends View {
  containerId: string;
  store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.containerId = containerId;
    this.store = store;
  }

  render() {
    this.appendComponent();
  }
}
