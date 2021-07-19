import View from '../../core/view';
import Store from '../../core/store';

import SelectPopup from '../common/select-popup';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="headerInvisibleComponent" class="header invisible">
    <div class="product-detail__header-icon">
        <i class="wmi wmi-chevron-left large"></i>
    </div>
    <div class="product-detail__header-icon">
        <i class="wmi wmi-more-vertical large"></i>
        <div id="headerInvisibleComponent__state-dropdown"></div>
    </div>
</div>
`;

interface Props {}

export default class HeaderInvisible extends View {
  private store: Store;
  private props: Props;
  private isDropdownShow: boolean;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
    this.isDropdownShow = false;
  }

  onClickHandler = () => {
    this.isDropdownShow = !this.isDropdownShow;
  };

  render() {
    this.appendComponent();
    new SelectPopup('#headerInvisibleComponent__state-dropdown', this.store, {
      items: [
        { label: '수정하기', color: '', disabled: false },
        { label: '삭제하기', color: 'red', disabled: false },
      ],
    }).render();
    this.pageContainer!.querySelector('##headerInvisibleComponent__state-dropdown')?.addEventListener(
      'click',
      this.onClickHandler
    );
  }
}
