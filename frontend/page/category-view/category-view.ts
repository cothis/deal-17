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
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
    <li class="category-item flex column gap-4 jc-center ai-center">
      <div class="img-box"></div>
      <div>디지털기기</div>
    </li>   
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
}
