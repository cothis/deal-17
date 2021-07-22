import View from '../../core/view';
import Store from '../../core/store';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="footerComponent">
    <div class="product-bar">
        <div class="flex ai-center grow w-20">
        <i data-id="{{__wishId__}}" class="{{__displayNone__}} wmi wmi-heart large grey1 {{__primary1__}}"></i>
            <div class="product-detail__bar"></div>
            <div>{{__price__}}</div>
        </div>
        <div class="flex grow jc-end w-20">
        <router-link to="/chat">
          <div class="button link small">채팅 목록 보기</div>
        </router-link>
        </div>
    </div>
</div>
`;

interface Props {
  isWish: boolean;
  price: string;
  chatRoomCount: number;
}

export default class Footer extends View {
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
