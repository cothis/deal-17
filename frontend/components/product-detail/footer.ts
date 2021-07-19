import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="footerComponent">
    <div class="product-bar">
        <div class="flex grow w-20">
            <i class="wmi wmi-heart large grey1"></i>
            <div>|</div>
            <div>{{__price__}}</div>
        </div>
        <div class="flex grow jc-end w-20">
            <div class="button link small">채팅 목록 보기</div>
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
