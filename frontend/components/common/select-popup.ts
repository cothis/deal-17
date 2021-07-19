import View from '../../core/view';
import Store from '../../core/store';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="SelectPopupComponent">
 {{__labels__}}
</div>
`;

interface Props {
  items: Array<{ label: string; color: string | null; disabled: boolean }>;
}

export default class SelectPopup extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.props.items.forEach((item) => {
      this.addHtml(`<div class="dropdown link ${item.color}">${item.label}</div>`);
    });
    const labels = this.getHtml();
    this.setTemplateData('labels', labels);

    this.appendComponent();
  }
}
