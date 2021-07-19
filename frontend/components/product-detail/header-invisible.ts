import View from '../../core/view';
import Store from '../../core/store';

import SelectPopup from '../common/select-popup';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="headerInvisibleComponent" class="header invisible">
    <div class="product-detail__header-icon">
        <i class="wmi wmi-chevron-left large"></i>
    </div>
    <div id="headerInvisibleComponent__detail" class="product-detail__header-icon">
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
  private selectPopup!: SelectPopup;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
    this.isDropdownShow = false;
  }

  onClickHandler(e: Event) {
    e.stopPropagation();
    this.isDropdownShow = !this.isDropdownShow;
    if (!this.isDropdownShow) {
      this.selectPopup.hide();
    } else {
      this.selectPopup.show();
    }
  }

  render() {
    this.appendComponent();
    this.selectPopup = new SelectPopup('#headerInvisibleComponent__state-dropdown', this.store, {
      items: [
        { label: '수정하기', color: '', disabled: false },
        { label: '삭제하기', color: 'red', disabled: false },
      ],
    });
    this.selectPopup.render();
    document
      .querySelector('#headerInvisibleComponent__detail')
      ?.addEventListener('click', this.onClickHandler.bind(this));
  }
}
