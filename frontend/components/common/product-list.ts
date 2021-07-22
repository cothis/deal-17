import { Product, Wish } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';
import { RouterEvent } from '../../core/router';
import { WishApi } from '../../core/api';

import { ProductComponent } from '../../components/common/product';

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
  private wishApi: WishApi;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
    this.wishApi = new WishApi();
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
        const wishElement = e.target as HTMLElement;
        const wishButtonId = Number(wishElement.dataset.id);

        if (wishButtonId) {
          // TODO: user id 연결하기
          console.log(this.store.user)
          if (wishElement.classList.contains('primary1')) {
            wishElement.classList.remove('primary1');
          } else {
            wishElement.classList.add('primary1');
          }

          this.wishApi.toggleWish(1, wishButtonId);
        } else {
          RouterEvent.dispatchEvent(`/product/${product.id}`);
        }
      });
    });
  }
}
