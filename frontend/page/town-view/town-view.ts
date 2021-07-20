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
  
  <div class="flex column grow p-4">
    <div class="flex column ai-center jc-center text medium grey1">
      <span>지역은 최소 1개 이상</span>
      <span>최대 2개까지 설정 가능해요.</span>
    </div>
    <div id="button-wrapper" class="flex justify-between gap-4 x-mt-24">
      <div class="button large flex-basis-50 justify-between location">
        <span>역삼동</span>
        <button type="button" class="text white">
          <i class="wmi wmi-close large cursor-pointer"></i>
        </button>
      </div>
      <div class="button large flex-basis-50 button-white">
        <button type="button" class="text primary1">
          <i class="wmi wmi-add large cursor-pointer"></i>
        </button>
      </div>
    </div>
  </div>
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

    this.pageContainer?.querySelector('#button-wrapper')?.addEventListener('click', (e) => {
      const target = (<HTMLElement>e.target).closest('i');
      if (!target) {
        return;
      }

      console.log(target);
    });
  }
}
