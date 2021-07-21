import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="titleComponent">
    <div class="info-saler">
        <div class="link small flex grow w-20">판매자 정보</div>
        <div class="flex ai-center grow w-20">
            <div class="product-detail__seller flex grow link small">{{__sellerEmail__}}</div>
            <div class="flex jc-end text xsmall gray3">{{__sellerTown__}}</div>
        </div>
    </div>
</div>
`;

interface Props {
  sellerEmail: string;
  sellerTown: string;
}

export default class SellerInfo extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.setTemplateData('sellerEmail', this.props.sellerEmail);
    this.setTemplateData('sellerTown', this.props.sellerTown);

    this.appendComponent();
  }

  setState(store: Store) {}
}
