import View from '../../core/view';
import { ChatRoom } from '../../../types';
import Store from '../../core/store';

const template: string = `
  <div class="chatting-item">
    chat item
  </div>
`;

interface Props {
  chatRoom: ChatRoom;
}

export class ChattingItemComponent extends View {
  private chatRoom: ChatRoom;
  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.chatRoom = props.chatRoom;
  }

  render() {
    this.updateView();
  }
}
