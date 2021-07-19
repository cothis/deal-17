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
        <div>역삼동</div>
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
            <div>1</div>
          </div>
          <div class="flex ai-center">
            <i class="wmi wmi-heart small"></i>
            <div>1</div>
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
  private product: Product;
  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.product = props.product;
  }

  render() {
    // TODO: image path 수정해야함
    this.setTemplateData(
      'image-path',
      'https://pds.joins.com/news/component/htmlphoto_mmdata/201912/02/e157f4c7-2dc7-416c-8a88-d1a3dbfff9e8.jpg'
    );
    this.setTemplateData('subject', this.product.subject);
    this.setTemplateData('price', convertToMarketPrice(this.product.price));
    this.updateView();
  }
}
