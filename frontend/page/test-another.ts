import View from '../core/view';
import Store from '../store';

const template = `
<div>
  <h1>Test Another</h1>
  <div>{{__test__}}</div>
</div>
`;

export default class TestAnotherView extends View {
  store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.setTemplateData('test', String(this.store.currentPage));

    this.updateView();
  }
}
