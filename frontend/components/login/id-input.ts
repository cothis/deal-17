import View from '../../core/view';
import Store from '../../core/store';

const template = `
<input type="text" class="input large my-2" placeholder="아이디를 입력하세요.">
`;

export default class IdInputComponent extends View {
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
