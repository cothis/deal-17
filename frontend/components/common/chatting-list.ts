import { ChatRoom } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';

import { ChattingItemComponent } from '../../components/common/chatting-item';

const template = `
<div id="chattingListComponent">
    {{__chat__}}
</div>
`;

interface Props {
  chatRooms: ChatRoom[];
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
    this.props.chatRooms.forEach((_, i) => {
      this.addHtml(`<div id="chattingListComponent__chat${i}"></div>`);
    });
    const html = this.getHtml();
    this.setTemplateData('chat', html);
    this.updateView();
    this.props.chatRooms.forEach((chatRoom, i) => {
      new ChattingItemComponent(`#chattingListComponent__chat${i}`, this.store, { chatRoom }).render();
    });
  }

  setState(store: Store) {}
}
