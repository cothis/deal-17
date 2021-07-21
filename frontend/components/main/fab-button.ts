import View from '../../core/view';
import Store from '../../core/store';
import { RouterEvent } from '../../core/router';

const template = `
<button id="FabButton{{__id__}}" class="button fab"></button>
`;

interface Props {}

export default class FabButton extends View {
  private static sequence: number = 0;
  private store: Store;
  private props: Props;
  private id: string;

  constructor(containerId: string, store: Store, props: Props) {
    super(containerId, template);
    this.store = store;
    this.props = props;
    this.id = String(++FabButton.sequence);
  }

  onClickHandler() {
    RouterEvent.dispatchEvent('/write');
  }

  render() {
    this.setTemplateData('id', String(this.id));
    this.updateView();

    const root = document.querySelector(`#FabButton${this.id}`);
    if (!root) throw 'root가 없습니다';

    root.addEventListener('click', this.onClickHandler);
  }

  setState(store: Store) {}
}
