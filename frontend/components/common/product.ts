import View from '../../core/view';
import { Product } from '../../../types';
import Store from '../../core/store';
import { convertToMarketPrice } from '../../helper/numberHelper';
import { convertToMarketDate } from '../../helper/dateHelper';

import SelectPopup from '../common/select-popup';

const template: string = `
  <div id="{{__id__}}" class="product-list-item">
    <div class="img-box large">
      <img src="{{__image-path__}}" alter="제품사진">
    </div>
    <div class="product-info flex column">
      <div class="product-info-title">
        <div class="link medium flex grow">{{__subject__}}</div>
        <i data-id="{{__wishId__}}" class="wmi wmi-heart large grey1 {{__primary1__}}"></i>
        <i id="{{__moreId__}}" class="moreButton wmi wmi-more-vertical large grey1"></i>
        <div id="{{__selectPopupId__}}" class="product-component-select-popup"></div>
      </div>
      <div class="product-content flex ai-center text small grey1">
        <div>{{__townName__}}</div>
        <div>&nbsp;&middot;&nbsp;</div>
        <div>{{__createdAt__}}</div>
      </div>
      <div class="product-price link small">
        <div>{{__price__}}</div>
      </div>
      <div class="product-icon-section flex grow text small grey1">
        <div class="product-icon-box grow flex">
          <div class="flex ai-center">
            <i class="wmi wmi-message-square small"></i>
            <div>{{__chatRooms__}}</div>
          </div>
          <div class="flex ai-center">
            <i class="wmi wmi-heart small"></i>
            <div>{{__wishes__}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

enum Action {
  EDIT = 1,
  DELETE = 2,
}

interface Props {
  product: Product;
  isMine: boolean;
}

export class ProductComponent extends View {
  private static sequence: number = 0;
  private props: Props;
  private store: Store;
  private id: string;
  private root?: HTMLElement;
  private isDropdownShow: boolean;
  private selectPopup!: SelectPopup;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.props = props;
    this.store = store;
    this.isDropdownShow = false;
    this.id = `ProductComponent${ProductComponent.sequence}`;
    ProductComponent.sequence++;
  }

  onClickEventHandler(e: Event) {
    e.stopPropagation();
    if (!this.isDropdownShow) {
      this.isDropdownShow = true;
      this.selectPopup.show();
    }
  }

  onClick(id: number) {
    this.selectPopup.hide();
    this.isDropdownShow = false;
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

  onHideClick(e: Event) {
    e.stopPropagation();
    this.selectPopup.hide();
    this.isDropdownShow = false;
  }

  render() {
    const selectPopupId = `${this.id}__state-dropdown`;

    this.setTemplateData('id', this.id);
    this.setTemplateData(
      'image-path',
      this.props.product.pictures[0]?.path ||
        'https://pds.joins.com/news/component/htmlphoto_mmdata/201912/02/e157f4c7-2dc7-416c-8a88-d1a3dbfff9e8.jpg'
    );
    this.setTemplateData('subject', this.props.product.subject);
    if (!this.props.isMine) {
      this.setTemplateData('moreId', String(this.props.product.id));
    } else {
      this.setTemplateData('wishId', String(this.props.product.id));
    }

    this.setTemplateData('selectPopupId', selectPopupId);
    this.setTemplateData('townName', this.props.product.townName || 'test동');
    this.setTemplateData('createdAt', convertToMarketDate(this.props.product.createdAt));
    this.setTemplateData('price', convertToMarketPrice(this.props.product.price));
    this.setTemplateData('chatRooms', String(this.props.product.chatRooms));
    this.setTemplateData('wishes', String(this.props.product.wishes));

    if (this.props.product.userWish) {
      this.setTemplateData('primary1', 'primary1');
    }

    this.updateView();
    this.root = document.querySelector(`#${this.id}`) as HTMLElement;

    const productInfoTitle = this.root.querySelector('.product-info-title');
    if (this.store.user) {
      console.log(this.props.isMine)
      if (this.props.isMine) {
        
        productInfoTitle?.classList.add('show-more-button');
      } else {
        productInfoTitle?.classList.add('show-heart-button');
      }
    }

    this.selectPopup = new SelectPopup(`#${selectPopupId}`, this.store, {
      items: [
        { id: 1, label: '수정하기', color: '', disabled: false },
        { id: 2, label: '삭제하기', color: 'red', disabled: false },
      ],
      onClick: this.onClick.bind(this),
    });
    this.selectPopup.render();

    const components = this.root.querySelectorAll('.moreButton');
    components.forEach((e) => {
      e.addEventListener('click', this.onClickEventHandler.bind(this));
    });

    document.body.addEventListener('click', this.onHideClick.bind(this));
    document.body.addEventListener('touchstart', this.onHideClick.bind(this));
  }
}
