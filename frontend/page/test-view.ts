import View from '../core/view';
import Store from '../store';

const template = `
<div>
  <h1>Test Rendering</h1>
  <div>{{__test__}}</div>
  <a href="another">another</a>
</div>
`;

export default class TestView extends View {
  store: Store;
  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.setTemplateData('test', this.store.user?.email ?? 'undefined Email');

    this.updateView();
  }
}
