import FabButton from '../components/main/fab-button';
import View from '../core/view';
import Store from '../store';

const template = `
<div>
  <h1>메인 뷰 입니다.</h1>
  <div id="MainView__FabButton1"></div>
  <div id="MainView__FabButton2"></div>
  <div id="MainView__FabButton3"></div>
  <div id="MainView__FabButton4"></div>
  <div>{{__products__}}</div>
</div>
`;

export default class MainView extends View {
  private store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.setTemplateData('products', this.store.getAllProducts().toString());
    this.updateView();

    for (let i = 1; i <= 4; i++) {
      const fabButton = new FabButton('MainView__FabButton' + i, this.store, {});
      fabButton.render();
    }
  }
}
