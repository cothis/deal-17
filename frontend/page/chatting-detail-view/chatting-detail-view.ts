/**
 * 컴포넌트 순서
 * product-summary.ts
 * message-list.ts
 * send-form.ts
 * exit-modal.ts
 */

import Store from '../../core/store';
import View from '../../core/view';
import { AnimateType } from '../../../types';
import { ProductApi } from '../../core/api';

import HeaderComponent from '../../components/common/header-white';
import ProductSummaryComponent from '../../components/chatting-detail/product-summary';
import MessageListComponent from '../../components/chatting-detail/message-list';
import SendFormComponent from '../../components/chatting-detail/send-form';

import './chatting-detail-view.css';

const template = `
<div class="chatting-detail">
    <div id="ChattingDetailView__header"></div>
    <div id="ChattingDetailView__product-summary"></div>
    <div id="ChattingDetailView__message-list"></div>
    <div id="ChattingDetailView__send-form"></div>
    <div id="ChattingDetailView__exit-modal"></div>
</div>
`;

export default class ChattingDetailView extends View {
  private store: Store;
  private productApi: ProductApi;

  constructor(selector: string, store: Store) {
    super(selector, template);
    this.store = store;
    this.productApi = new ProductApi();
  }

  render(remainUrl: string) {
    const chatRoomId = Number(remainUrl.substr(1, 1));

    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);

    this.productApi.getProductById(1).then((product) => {
      new HeaderComponent('#ChattingDetailView__header', this.store, { title: 'test user' }).render();
      new ProductSummaryComponent('#ChattingDetailView__product-summary', this.store, { product }).render();
    });

    new MessageListComponent('#ChattingDetailView__message-list', this.store, {
      messages: [
        {
          isMine: false,
          content: 'test message 내용입니다',
        },
        {
          isMine: true,
          content: 'test message 답장입니다.',
        },
        {
          isMine: false,
          content: 'test message 내용입니다',
        },
        {
          isMine: true,
          content: 'test message 답장입니다.',
        },
        {
          isMine: false,
          content: 'test message 내용입니다',
        },
        {
          isMine: true,
          content: 'test message 답장입니다.',
        },
        {
          isMine: false,
          content: 'test message 내용입니다',
        },
        {
          isMine: true,
          content: 'test message 답장입니다.',
        },
        {
          isMine: false,
          content: 'test message 내용입니다',
        },
        {
          isMine: true,
          content: 'test message 답장입니다.',
        },
        {
          isMine: false,
          content: 'test message 내용입니다',
        },
        {
          isMine: true,
          content: 'test message 답장입니다.',
        },
      ],
    }).render();

    new SendFormComponent('#ChattingDetailView__send-form', this.store, {
      placeholder: '메세지를 입력하세요.',
    }).render();
    // new ExitModal('#ChattingDetailView__exit-modal', this.store, {});
  }
}
