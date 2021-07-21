import View from '../../core/view';
import { Product } from '../../../types';
import Store from '../../core/store';
import { convertToMarketPrice } from '../../helper/numberHelper';

const template: string = `
  <div class="info-product flex">
    <img class="img-box flex no-grow" src="{{__imagePath__}}">
    <div class="flex column grow x-pl-16">
      <div class="text small">{{__subject__}}</div>
      <div class="text xsmall gray3">{{__price__}}</div>
    </div>
    <div class="status">{{__state__}}</div>
  </div>
`;

interface Props {
  product: Product;
}

export default class ProductSummaryComponent extends View {
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
    this.setTemplateData('state', '판매중');
    this.updateView();
  }
}
