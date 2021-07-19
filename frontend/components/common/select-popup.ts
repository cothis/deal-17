import View from '../../core/view';
import Store from '../../core/store';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="{{__id__}}" class="display-none">
 {{__labels__}}
</div>
`;

interface Props {
  items: Array<{ label: string; color: string | null; disabled: boolean }>;
}

export default class SelectPopup extends View {
  private static sequence: number = 1;
  private id: string;
  private store: Store;
  private props: Props;
  private root!: Element;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.id = `selectPopupComponent-${SelectPopup.sequence}`;
    this.store = store;
    this.props = props;
    SelectPopup.sequence++;
  }

  onClickEventHandler(e: Event) {
    e.stopPropagation();
  }

  show() {
    this.root.classList.remove('display-none');
  }

  hide() {
    this.root.classList.add('display-none');
  }

  render() {
    this.setTemplateData('id', this.id);
    this.props.items.forEach((item) => {
      this.addHtml(`<div class="dropdown link ${item.color}">${item.label}</div>`);
    });
    const labels = this.getHtml();
    this.setTemplateData('labels', labels);

    this.appendComponent();
    this.root = document.querySelector(`#${this.id}`)!;
    this.root.addEventListener('click', this.onClickEventHandler.bind(this));
  }
}
