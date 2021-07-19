import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType } from '../../../types';

const template: string = `
<div class="flex column grow">
  <div class="header offwhite p-5">
    <router-link to="@back" class="icon-wrapper">
      <i class="wmi wmi-chevron-left large"></i>
    </router-link>  
    <span class="text medium">내 동네 설정하기</span>
    <button type="button" class="icon-wrapper"></button>  
  </div>
  
  <ul class="category-container flex grow">
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>생활가전</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>가구/인테리어</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>게임/취미</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>생활/가공식품</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>스포츠/레저</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>여성패션/잡화</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>남성패션/잡화</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>유아동</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>뷰티/미용</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>반려동물</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>도서/티켓/음반</div>
    </li>   
  </ul>
</div>
`;

export default class TownView extends View {
  private store: Store;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
  }

  render() {
    this.appendView(AnimateType.LEFT, AnimateType.LEFT);
  }
}
