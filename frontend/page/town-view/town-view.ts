import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType } from '../../../types';
import './town-view.css';
import PopupComponent from '../../popup-view/popup-component';

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
      <town-button state="active" name="역삼동"></town-button>
      <town-button state="add"></town-button>
      <town-button state="inactive" name="두두동"></town-button>
    </div>
  </div>
</div>
<div id="town-popup" class="modal-wrapper display-none"></div>
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
      const button = (<HTMLElement>e.target).closest('button');
      if (!button) {
        return;
      }

      new PopupComponent('#town-popup', this.store, {
        input: {
          label: '현재 위치를 입력하세요.',
          placeholder: '시 구 제외, 동만 입력',
        },
        okText: '확인',
        okClickHandler: (e) => console.log(e.target),
      }).render();
    });
  }

  setState(store: Store) {}
}
