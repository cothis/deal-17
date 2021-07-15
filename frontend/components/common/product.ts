import View from '../../core/view';
import { Product } from '../../../types';
import Store from '../../core/store';

const template: string = `
  <div class="product-list-item">
    <div class="img-box large">
      <img src="{{__image-path__}}" alter="제품사진">
    </div>
    <div class="product-info flex column">
      <div class="product-info-title">
        <div class="link medium flex grow">{{__subject__}}</div>
        <img class="" src="/frontend/static/images/icons/heart.png" alter="아이콘">
      </div>
      <div class="flex ai-center text small grey1">
        <div>Location</div>
        <div>.</div>
        <div>Timestamp</div>
      </div>
      <div class="price-bar">
        <div>price</div>
      </div>
      <div class="product-icon-section flex grow text small grey1">
        <div class="product-icon-box grow flex">
          <div class="flex ai-center">
            <img class="product-bottom-icon" src="/frontend/static/images/icons/message-square.png" alter="아이콘">
            <div>1</div>
          </div>
          <div class="flex ai-center">
            <img class="product-bottom-icon" src="/frontend/static/images/icons/heart.png" alter="아이콘">
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
    // this.setTemplateData('image-path', this.product.pictures[0].path);
    this.setTemplateData('subject', this.product.subject);
    this.updateView();
  }
}
