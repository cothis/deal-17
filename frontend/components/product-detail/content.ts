import View from '../../core/view';
import Store from '../../core/store';

import '../../page/product-detail-view/product-detail-view.css';

const template = `
<div id="contentComponent">
  <pre class="product-detail__content text large">{{__content__}}</pre>
  <div class="text xsmall grey1 x-mt-24">채팅 {{__chatRooms__}} &middot; 관심 {{__wishes__}} &middot; 조회 {{__views__}}</div>
</div>
`;

interface Props {
  content: string;
  chatRooms: number;
  wishes: number;
  views: number;
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
    this.setTemplateData('chatRooms', String(this.props.chatRooms));
    this.setTemplateData('wishes', String(this.props.wishes));
    this.setTemplateData('views', String(this.props.views));

    this.appendComponent();
  }
}
