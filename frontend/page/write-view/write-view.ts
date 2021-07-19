import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType } from '../../../types';
import './write-view.css';

const template: string = `
<div class="d-flex col">
  <div id="writeView__header" class="header white p-5">
    <router-link to="@back" class="icon-wrapper">
      <i class="wmi wmi-chevron-left large"></i>
    </router-link>  
    <span class="text medium">글쓰기</span>
    <button type="button" class="icon-wrapper"><i class="wmi wmi-check large"></i>   
    </button>
  </div>
  <div class="d-flex col justify-between p-5 border-y">
    <div class="d-flex py-4">
      <div class="img-box medium img-button">
        <i class="wmi wmi-image large"></i>
        <span>0/10</span>
      </div>
      <ul class="d-flex">
        <li class="img-button delete">
          <div class="img-box medium">
            <img src="https://fujifilm-x.com/wp-content/uploads/2019/08/x-t30_sample-images03.jpg">
          </div>
        </li>
        <li class="img-button delete">
          <div class="img-box medium">
            <img src="https://fujifilm-x.com/wp-content/uploads/2019/08/x-t30_sample-images03.jpg">
          </div>
        </li>
      </ul>
    </div>
    <hr>
    <div class="py-4">
      <div>
        <span>빈티지 롤러 스케이트</span>
      </div>
      <div>
        <div class="text medium grey1">(필수)카테고리를 선택해주세요.</div>
        <ul class="d-flex category-list">
          <li>
            <button class="category-list-item">여성패션/잡화</button>
          </li>
          <li>
            <button class="category-list-item">여성패션/잡화</button>
          </li>
          <li>
            <button class="category-list-item">여성패션/잡화</button>
          </li>
          <li>
            <button class="category-list-item">여성패션/잡화</button>
          </li>
        </ul>
      </div>
    </div>
    <hr>
    <div class="py-4">
      가격
    </div>
    <hr>
    <div class="py-4">
      게시글
    </div>
  </div>
  <div class="p-5">
    역삼동
  </div>
</div>
`;

export default class WriteView extends View {
  private store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.appendView(AnimateType.DOWN, AnimateType.DOWN);
  }
}
