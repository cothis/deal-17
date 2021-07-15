import View from '../../core/view';
import { Product } from '../../../types';
import Store from '../../core/store';

const template: string = `
  <div class="product-list-item">
    <div class="img-box large">
      <img src="{{__image-path__}}" alter="제품사진">
    </div>
    <div class="product-info">
      <div class="title-bar">
        <span class="link medium">{{__subject__}}</span>
        <img class="menu-icon" src="../../static/images/icons/heart.png" alter="아이콘">
      </div>
      <div class="location-bar">
        <span>Location</span>
        <span>.</span>
        <span>Timestamp</span>
      </div>
      <div class="price-bar">
        <span>price</span>
      </div>
      <div class="message-bar">
        <span>message1 heart1</span>
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
