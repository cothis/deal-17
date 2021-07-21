import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType } from '../../../types';
import './write-view.css';
import { text } from 'express';

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
  <div class="d-flex col h-full p-5 border-y">
    <div class="d-flex py-4 gap-4 border-bottom">
      <div id="imgButton" class="img-box medium img-button">
        <i class="wmi wmi-image large"></i>
        <span>{{__imageCount__}}/10</span>
      </div>
      <ul id="imgList" class="d-flex gap-4">
        {{__images__}}
      </ul>
    </div>
    <div class="py-4 border-bottom">
      <div>
        <input type="text" class="write-input text large" placeholder="글 제목">
      </div>
      <div>
        <div class="text medium grey1">(필수)카테고리를 선택해주세요.</div>
        <ul class="category-list">
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
    <div class="py-4 border-bottom">
    <input type="text" class="write-input" placeholder="₩ 가격(선택사항)">
    </div>
    <div class="py-4">
      <textarea class="write-input textarea"></textarea>
    </div>
  </div>
  <div class="location-bar p-5">
    <i class="wmi wmi-map-pin large"></i>
    역삼동
  </div>
</div>
`;

interface State {
  images: any[];
}

export default class WriteView extends View {
  private store: Store;
  private state: State;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
    this.state = { images: [] };
  }

  addEventListener() {
    if (!this.pageContainer) return;

    this.pageContainer.querySelector('.textarea')?.addEventListener('input', (e) => {
      const textarea = <HTMLElement>e.target;

      textarea.style.height = '1px';
      textarea.style.height = textarea.scrollHeight + 'px';
    });

    this.pageContainer.querySelector('.img-button.delete::after')?.addEventListener('click', (e) => {
      console.log('clicked');
    });

    this.pageContainer.querySelector('#imgButton')?.addEventListener('click', (e) => {
      this.state.images.push({ path: 'https://fujifilm-x.com/wp-content/uploads/2019/08/x-t30_sample-images03.jpg' });

      (<HTMLElement>(
        this.pageContainer?.querySelector('#imgButton > span')
      )).innerHTML = `${this.state.images.length}/10`;

      (<HTMLElement>this.pageContainer?.querySelector('#imgList')).innerHTML = this.makeImagesTemplate();
    });
  }

  makeImagesTemplate(): string {
    this.state.images.forEach((image) => {
      this.addHtml(`
      <li class="img-button delete">
        <div class="img-box medium">
          <img src="${image.path}">
        </div>
      </li>
      `);
    });

    return this.getHtml();
  }

  updateTemplate() {
    this.setTemplateData('imageCount', String(this.state.images.length));

    this.setTemplateData('images', this.makeImagesTemplate());
  }

  repaint() {
    this.updateTemplate();
    this.updateView();
    this.addEventListener();
  }

  render() {
    this.updateTemplate();
    this.appendView(AnimateType.DOWN, AnimateType.DOWN);
    this.addEventListener();
  }
}
