import View from '../../core/view';
import Store from '../../core/store';
import { convertToMarketDate } from '../../helper/dateHelper';

const template = `
<div id="titleComponent">
  <div class="text large">{{__subject__}}</div>
  <div class="text xsmall grey1 x-mt-8">{{__category__}} &middot; {{__createdAt__}}</div>
</div>
`;

interface Props {
  subject: string;
  category: string;
  createdAt: string;
}

export default class State extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.setTemplateData('subject', this.props.subject);
    this.setTemplateData('category', this.props.category);
    this.setTemplateData('createdAt', convertToMarketDate(this.props.createdAt));
    this.appendComponent();
  }
}
