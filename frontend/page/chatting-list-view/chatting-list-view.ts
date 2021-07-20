import { Product, Picture, ChatRoom } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';
import { ProductApi, ChatRoomApi, WishApi } from '../../core/api';
import { AnimateType } from '../../../types';

import Header from '../../components/common/header-white';
import chattingListComponent from '../../components/common/chatting-list';

import './chatting-list-view.css';

const template = `
 <div class="chatting-list">
   <div id="ChattingListView__header"></div>
   <div id="ChattingListView__content"></div>
 </div>
 `;

export default class ChattingList extends View {
  private store: Store;
  private chatRoomApi: ChatRoomApi;

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    this.chatRoomApi = new ChatRoomApi();
  }

  render(remainUrl?: string) {
    const productId = Number(remainUrl?.substr(1, 1));
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);

    new Header('#ChattingListView__header', this.store, { title: '채팅하기' }).render();

    this.chatRoomApi.getChatRoomByProductId(1).then((chatRooms: ChatRoom[]) => {
      new chattingListComponent('#ChattingListView__content', this.store, { chatRooms }).render();
    });
  }
}
