import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType, Town } from '../../../types';
import './town-view.css';
import PopupComponent from '../../popup-view/popup-component';
import { TownApi } from '../../core/api';

const template: string = `
<div class="zindex-100 flex column grow">
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
      {{__town-button__}}
    </div>
  </div>
</div>
<div id="town-popup" class="modal-wrapper display-none"></div>
`;

export default class TownView extends View {
  private store: Store;
  private api: TownApi;
  private clickedIndex: number;

  constructor(containerId: string, store: Store) {
    super(containerId, template);

    this.store = store;
    this.api = new TownApi();
    this.clickedIndex = 0;
  }

  onRemoveClick(e: Event) {
    if (this.store.towns.length > 1) {
      this.api.deleteUserTown(this.store.user!.id, this.store.towns[this.clickedIndex].id);
      this.store.deleteTown(this.clickedIndex);
    }
  }

  onAddClick(e: Event) {
    const value = (<HTMLInputElement>this.pageContainer?.querySelector('#popupText')).value;
    this.api.addUserTown(this.store.user!.id, value).then((res) => {
      this.store.addTown(res.town);
      console.log(this.store.towns);
    });
  }

  onButtonWrapperClick(e: Event) {
    const button = (<HTMLElement>e.target).closest('button');
    if (!button) {
      return;
    }

    const townButton = <HTMLElement>(<HTMLElement>e.target).closest('town-button');
    if (!townButton) return;

    this.clickedIndex = parseInt(townButton.dataset.index!);

    const state = townButton.getAttribute('state');
    let handler: (e: Event) => void;
    let input;
    let okText = '삭제';
    let title;
    let isAlert;
    if (state === 'active' || state === 'inactive') {
      handler = this.onRemoveClick;
      okText = '삭제';
      title = '정말 삭제하시겠습니까?';
      isAlert = true;
    } else if (state === 'add') {
      handler = this.onAddClick;
      okText = '확인';
      input = {
        label: '현재 위치를 입력하세요.',
        placeholder: '시 구 제외, 동만 입력',
      };
    }

    new PopupComponent('#town-popup', this.store, {
      title: title,
      input: input,
      okText: okText,
      isAlert: isAlert,
      okClickHandler: handler!.bind(this),
    }).render();
  }

  makeTownButtons(towns: Town[]) {
    for (let i = 0; i < 2; i++) {
      const town = towns[i];
      if (town) {
        this.addHtml(
          `<town-button state="${town.isActive ? 'active' : 'inactive'}" name="${
            town.name
          }" data-index="${i}"></town-button>`
        );
      } else {
        this.addHtml(`<town-button state="add"></town-button>`);
      }
    }

    return this.getHtml();
  }

  render() {
    if (this.store.user) {
      this.api.getTownsByUserId(this.store.user.id).then((result) => {
        this.store.towns = result;
        const htmls = this.makeTownButtons(result);

        this.setTemplateData('town-button', htmls);

        this.appendView(AnimateType.LEFT, AnimateType.LEFT);

        this.pageContainer
          ?.querySelector('#button-wrapper')
          ?.addEventListener('click', this.onButtonWrapperClick.bind(this));
      });
    }
  }

  onStoreChange() {
    const buttonWrapper = this.pageContainer?.querySelector('#button-wrapper');
    if (buttonWrapper) {
      const townsHtml = this.makeTownButtons(this.store.towns);
      buttonWrapper.innerHTML = townsHtml;
    }
  }
}
