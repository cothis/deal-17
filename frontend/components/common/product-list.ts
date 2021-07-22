import { Product, Wish } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';
import { RouterEvent } from '../../core/router';
import { WishApi } from '../../core/api';

import { ProductComponent } from '../../components/common/product';

const template = `
<div id="productListComponent__product">
{{__product__}}
</div>
`;

interface Props {
  products: Product[];
  viewName: string;
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

  onProductWishClick(e: Event, product: Product) {
    const wishElement = e.target as HTMLElement;
    const wishButtonId = Number(wishElement.dataset.id);
    console.log(wishElement.dataset)

    if (wishButtonId) {
      if (wishElement.classList.contains('primary1')) {
        wishElement.classList.remove('primary1');
      } else {
        wishElement.classList.add('primary1');
      }

      this.wishApi.toggleWish(this.store.user!.id, wishButtonId);
    } else {
      RouterEvent.dispatchEvent(`/product/${product.id}`);
    }
  }

  render() {
    this.updateView();
    console.log(this.props.products);
    this.props.products.forEach((_, i) => {
      this.addHtml(`<div id="${this.props.viewName}__product${i}"></div>`);
    });
    const html = this.getHtml();
    this.setTemplateData('product', html);
    this.updateView();
    this.props.products.forEach((product, i) => {
      console.log(product);
      new ProductComponent(`#${this.props.viewName}__product${i}`, this.store, {
        product,
        isMine: this.store.user?.id === product.sellerId,
      }).render();
      const productComponent = document.querySelector(`#${this.props.viewName}__product${i}`);
      productComponent?.addEventListener('click', (e) => {
        this.onProductWishClick(e, product)
      });
    });
  }
}
