import View from '../../core/view';
import Store from '../../core/store';

import SelectPopup from '../common/select-popup';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="headerInvisibleComponent" class="header invisible">
    <router-link to="@back" class="product-detail__header-icon">
        <i class="wmi wmi-chevron-left large"></i>
    </router-link>
    <div id="headerInvisibleComponent__detail" class="product-detail__header-icon">
        <i class="wmi wmi-more-vertical large"></i>
        <div id="headerInvisibleComponent__state-dropdown"></div>
    </div>
</div>
`;

enum Action {
  EDIT = 1,
  DELETE = 2,
}

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

  onClickEventHandler(e: Event) {
    e.stopPropagation();
    this.isDropdownShow = !this.isDropdownShow;
    if (!this.isDropdownShow) {
      this.selectPopup.hide();
    } else {
      this.selectPopup.show();
    }
  }

  onClick(id: number) {
    this.selectPopup.hide();
    switch (id) {
      case Action.EDIT:
        // 수정
        console.log('수정하기 클릭');
        break;
      case Action.DELETE:
        // 삭제
        console.log('삭제 클릭');
        break;
    }
  }

  render() {
    this.appendComponent();

    this.selectPopup = new SelectPopup('#headerInvisibleComponent__state-dropdown', this.store, {
      items: [
        { id: 1, label: '수정하기', color: '', disabled: false },
        { id: 2, label: '삭제하기', color: 'red', disabled: false },
      ],
      onClick: this.onClick.bind(this),
    });
    this.selectPopup.render();

    document
      .querySelector('#headerInvisibleComponent__detail')
      ?.addEventListener('click', this.onClickEventHandler.bind(this));
  }
}
