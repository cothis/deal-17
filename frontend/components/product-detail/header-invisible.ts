import View from '../../core/view';
import Store from '../../core/store';

import SelectPopup from '../common/select-popup';

import '../../page/product-detail-view/product-detail-view.css';
import { Product } from '../../../types';
import { RouterEvent } from '../../core/router';

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

interface Props {
  productId: number;
  rootElement: HTMLElement;
}

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
    if (!this.isDropdownShow) {
      this.isDropdownShow = true;
      this.selectPopup.show();
    }
  }

  onClick(id: number) {
    console.log(this);
    this.selectPopup.hide();
    this.isDropdownShow = false;
    switch (id) {
      case Action.EDIT:
        // 수정
        RouterEvent.dispatchEvent(`/modify/${this.props.productId}`);
        console.log('수정하기 클릭');
        break;
      case Action.DELETE:
        // 삭제
        console.log('삭제 클릭');
        break;
    }
  }

  onHideClick(e: Event) {
    const target = (<HTMLElement>e.target).closest('#headerInvisibleComponent__state-dropdown');
    if (target) return;

    e.stopPropagation();
    this.selectPopup.hide();
    this.isDropdownShow = false;
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

    const component = document.querySelector('#headerInvisibleComponent__detail');
    component?.addEventListener('click', this.onClickEventHandler.bind(this));

    this.props.rootElement.addEventListener('click', this.onHideClick.bind(this));
    this.props.rootElement.addEventListener('touchstart', this.onHideClick.bind(this));
  }
}
