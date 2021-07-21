import View from '../../core/view';
import { ChatRoom } from '../../../types';
import { ChatRoomApi } from '../../core/api';
import Store from '../../core/store';

const template: string = `
  <div class="chat-list-item {{__unread__}}">
    <div class="item__left">
        <div class="flex">
            <div class="link medium namebar">{{__userId__}}</div>
            <div class="text small grey1 messagebar">{{__createdAt__}}</div>
        </div>
        <div class="flex">
            <div class="text medium grey1 message">{{__content__}}</div>
            <div class="text xsmall unread-count {{__display__}}">{{__unreadCount__}}</div>
        </div>
    </div>
    <div class="img-box">
        <img src="{{__imaePath__}}" />
    </div>
  </div>
`;

interface Props {
  chatRoom: ChatRoom;
}

export class ChattingItemComponent extends View {
  private props: Props;
  private store: Store;
  private chatRoom: ChatRoom;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.chatRoom = props.chatRoom;
    this.props = props;
    this.store = store;
  }

  render() {
    // TODO: user 조인해서 email 가져와야 함
    this.setTemplateData('userId', 'Test user');
    // TODO: message 조인해와서 아래 내용 채워야함
    this.setTemplateData('createdAt', '1분 전');
    this.setTemplateData('content', 'test');
    this.setTemplateData('unreadCount', '2');
    this.setTemplateData('imagePath', '');
    if (this.props.chatRoom.unread) {
      this.setTemplateData('unread', 'unread');
    } else {
      this.setTemplateData('display', 'display-none');
    }
    this.updateView();
  }

  setState(store: Store) {}
}
