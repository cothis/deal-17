import { Product } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';

import { ProductComponent } from '../../components/common/product';
import { RouterEvent } from '../../core/router';

const template = `
<div id="mainView__product">
{{__product__}}
</div>
`;

interface Props {
  products: Product[];
}

export default class ProductList extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.updateView();
    this.props.products.forEach((_, i) => {
      this.addHtml(`<div id="mainView__product${i}"></div>`);
    });
    const html = this.getHtml();
    this.setTemplateData('product', html);
    this.updateView();
    this.props.products.forEach((product, i) => {
      new ProductComponent(`#mainView__product${i}`, this.store, { product }).render();
      const productComponent = document.querySelector(`#mainView__product${i}`);
      productComponent?.addEventListener('click', (e) => {
        const wishButtonId = (e.target as HTMLElement).dataset.id;
        
        if (wishButtonId) {
          console.log('wish');
        } else {
          RouterEvent.dispatchEvent(`/product/${product.id}`);
        }
      });
    });
  }
}
