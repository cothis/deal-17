import { Message } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';

import { ChattingItemComponent } from '../../components/common/chatting-item';

const template = `
<div id="messageListComponent" class="p-4 flex column">
    {{__messageList__}}
</div>
`;

interface Props {
  messages: Array<{ isMine: boolean; content: string }>;
}

export default class MessageListComponent extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.props.messages.forEach((message) => {
      this.addHtml(
        `<div class="flex ${message.isMine ? 'jc-end' : ''}"><div class="chat-bubble ${message.isMine ? 'fill' : ''}">${
          message.content
        }</div></div>`
      );
    });

    this.setTemplateData('messageList', this.getHtml());
    this.updateView();
  }
}
