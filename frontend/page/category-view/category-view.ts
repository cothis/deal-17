import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType } from '../../../types';
import './category-view.css';

const template: string = `
<div class="flex column grow">
  <div class="header offwhite p-5">
    <router-link to="@back" class="icon-wrapper">
      <i class="wmi wmi-chevron-left large"></i>
    </router-link>  
    <span class="text medium">카테고리</span>
    <button type="button" class="icon-wrapper"></button>  
  </div>
  
  <ul class="category-container flex grow">
    <category-item>디지털기기</category-item>
    <category-item>생활가전</category-item>
    <category-item>가구/인테리어</category-item>
    <category-item>게임/취미</category-item>
    <category-item>생활/가공식품</category-item>
    <category-item>스포츠/레저</category-item>
    <category-item>여성패션/잡화</category-item>
    <category-item>남성패션/잡화</category-item>
    <category-item>유아동</category-item>
    <category-item>뷰티/미용</category-item>
    <category-item>반려동물</category-item>
    <category-item>도서/티켓/음반</category-item>
  </ul>
</div>
`;

export default class CategoryView extends View {
  private store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.appendView(AnimateType.LEFT, AnimateType.LEFT);
  }

  setState(store: Store) {}
}
