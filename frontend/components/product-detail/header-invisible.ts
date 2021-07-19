import View from '../../core/view';
import Store from '../../core/store';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="headerInvisibleComponent" class="header invisible">
    <div class="product-detail__header-icon">
        <i class="wmi wmi-chevron-left large"></i>
    </div>
    <div class="product-detail__header-icon">
        <i class="wmi wmi-more-vertical large"></i>
    </div>
</div>
`;

interface Props {
  isWish: boolean;
  price: string;
  chatRoomCount: number;
}

export default class HeaderInvisible extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.setTemplateData('price', this.props.price);

    this.appendComponent();
  }
}
