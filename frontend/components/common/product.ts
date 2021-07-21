import View from '../../core/view';
import { Product } from '../../../types';
import Store from '../../core/store';
import { convertToMarketPrice } from '../../helper/numberHelper';

const template: string = `
  <div class="product-list-item">
    <div class="img-box large">
      <img src="{{__image-path__}}" alter="제품사진">
    </div>
    <div class="product-info flex column">
      <div class="product-info-title">
        <div class="link medium flex grow">{{__subject__}}</div>
        <i class="wmi wmi-heart large grey1"></i>
      </div>
      <div class="product-content flex ai-center text small grey1">
        <div>{{__townName__}}</div>
        <div>&nbsp;&middot;&nbsp;</div>
        <div>2시간 전</div>
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

interface Props {
  product: Product;
}

export class ProductComponent extends View {
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.props = props;
  }

  render() {
    this.setTemplateData(
      'image-path',
      this.props.product.pictures[0]?.path ||
        'https://pds.joins.com/news/component/htmlphoto_mmdata/201912/02/e157f4c7-2dc7-416c-8a88-d1a3dbfff9e8.jpg'
    );
    this.setTemplateData('subject', this.props.product.subject);
    this.setTemplateData('townName', this.props.product.townName || 'test동');
    this.setTemplateData('price', convertToMarketPrice(this.props.product.price));
    this.setTemplateData('chatRooms', String(this.props.product.chatRooms));
    this.setTemplateData('wishes', String(this.props.product.wishes));
    this.updateView();
  }
}
