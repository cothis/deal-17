import LoginHeaderComponent from '../components/login/login-header';
import View from '../core/view';
import Store from '../core/store';
import { AnimateType } from '../../types';
import JoinInputFormComponent from '../components/join/join-input-form';

const template: string = `
<div id="joinView" class="joiv-view">
  <div id="joinView__header" class="header offwhite p-5"></div>
  <div class="container">
    <div id="joinView__inputForm" class="d-flex col p-5"></div>
  </div>
</div>
`;

export default class JoinView extends View {
  private store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.appendView(AnimateType.RIGHT, AnimateType.RIGHT);
    new LoginHeaderComponent('#joinView__header', this.store, { title: '회원가입' }).render();
    new JoinInputFormComponent('#joinView__inputForm', this.store).render();
  }
}
