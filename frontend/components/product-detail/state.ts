import View from '../../core/view';
import Store from '../../core/store';

import SelectPopup from '../common/select-popup';

const template = `
<div id="stateComponent" class="status">
  <div class="link small">{{__state__}}</div>
  <i class="wmi wmi-chevron-down product-detail__arrow grey1 small"></i>
  <div id="stateComponent__state-dropdown"></div>
</div>
`;

enum ProductState {
  SALE = 0,
  RESERVED = 1,
  COMPLETED = 2,
}

enum ProductLabel {
  SALE = '판매중',
  RESERVED = '예약중',
  COMPLETED = '거래완료',
}

interface Props {
  state: number;
}

export default class State extends View {
  private store: Store;
  private props: Props;
  private state: string;
  private isDropdownShow: boolean = false;
  private selectPopup!: SelectPopup;
  private activeState: ProductState;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
    this.activeState = this.props.state;

    switch (this.props.state) {
      case ProductState.SALE:
        this.state = ProductLabel.SALE;
        break;
      case ProductState.RESERVED:
        this.state = ProductLabel.RESERVED;
        break;
      case ProductState.COMPLETED:
        this.state = ProductLabel.COMPLETED;
        break;
      default:
        this.state = '';
        break;
    }
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
      case ProductState.SALE:
        // 판매중
        console.log('판매중');
        this.state = ProductLabel.SALE;
        this.activeState = ProductState.SALE;
        break;
      case ProductState.RESERVED:
        // 예약중
        console.log('예약중');
        this.state = ProductLabel.RESERVED;
        this.activeState = ProductState.RESERVED;
        break;
      case ProductState.COMPLETED:
        // 거래완료
        console.log('거래완료');
        this.state = ProductLabel.COMPLETED;
        this.activeState = ProductState.COMPLETED;
        break;
    }
    this.render();
  }

  isNotActiveState(state: ProductState) {
    return this.activeState !== state;
  }

  render() {
    this.isDropdownShow = false;
    this.setTemplateData('state', this.state);
    this.updateView();

    this.selectPopup = new SelectPopup('#stateComponent__state-dropdown', this.store, {
      items: [
        {
          id: ProductState.SALE,
          label: `${ProductLabel.SALE}으로 변경`,
          show: this.isNotActiveState(ProductState.SALE),
        },
        {
          id: ProductState.RESERVED,
          label: `${ProductLabel.RESERVED}으로 변경`,
          show: this.isNotActiveState(ProductState.RESERVED),
        },
        {
          id: ProductState.COMPLETED,
          label: `${ProductLabel.COMPLETED}로 변경`,
          show: this.isNotActiveState(ProductState.COMPLETED),
        },
      ],
      onClick: this.onClick.bind(this),
    });
    this.selectPopup.render();

    document.querySelector('#stateComponent')?.addEventListener('click', this.onClickEventHandler.bind(this));
  }
}
