import View from '../../core/view';
import Store from '../../core/store';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="contentComponent">
  <pre class="product-detail__content text large">{{__content__}}</pre>
  <div class="text xsmall grey1 x-mt-24">채팅 {{__chatRoomCount__}} &middot; 관심 {{__wishCount__}} &middot; 조회 {{__viewCount__}}</div>
</div>
`;

interface Props {
  content: string;
}

export default class Content extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.setTemplateData('content', this.props.content);
    this.setTemplateData('chatRoomCount', '0');
    this.setTemplateData('wishCount', '1');
    this.setTemplateData('viewCount', '0');

    this.appendComponent();
  }

  setState(store: Store) {}
}
