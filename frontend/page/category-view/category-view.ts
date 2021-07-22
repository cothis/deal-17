import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType, CATEGORIES } from '../../../types';
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
    {{__categories__}}
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
    const categories = CATEGORIES.map(
      (category) => `<category-item path="${category.image}">${category.name}</category-item>`
    ).join('');
    this.setTemplateData('categories', categories);
    this.appendView(AnimateType.LEFT, AnimateType.LEFT);
  }
}
