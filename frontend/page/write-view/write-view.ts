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
    <div class="d-flex gap-4 border-bottom">
      <input id="fileInput" type="file" class="d-none" multiple accept=".gif, .jpg, .png">
      <div id="imgButton" class="no-shrink my-4 img-box medium img-button">
        <i class="wmi wmi-image large"></i>
        <span>{{__imageCount__}}/10</span>
      </div>
      <ul id="imgList" class="d-flex gap-4 grow overflow-x-auto">
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
  images: File[];
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

    this.pageContainer.querySelector('#fileInput')?.addEventListener('change', this.onFileChange.bind(this));

    this.pageContainer.querySelector('#imgButton')?.addEventListener('click', (e) => {
      (<HTMLElement>this.pageContainer?.querySelector('#fileInput')).click();
    });
  }

  onFileChange(e: Event) {
    const files = (<HTMLInputElement>e.target).files;
    if (!files) return;

    for (let i = 0; i < files?.length; i++) {
      this.state.images.push(files[i]);
    }

    this.updatePage();
  }

  updatePage() {
    (<HTMLElement>this.pageContainer?.querySelector('#imgButton > span')).innerHTML = `${this.state.images.length}/10`;
    this.makeImagesTemplate().then((result) => {
      (<HTMLElement>this.pageContainer?.querySelector('#imgList')).innerHTML = result;
    });
  }

  getTemporalPath(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', (e) => {
        resolve(String((<FileReader>e.target).result));
      });
      fileReader.readAsDataURL(file);
    });
  }

  makeImagesTemplate(): Promise<string> {
    const promiseArray = [];
    for (const image of this.state.images) {
      promiseArray.push(
        new Promise<void>((resolve) =>
          this.getTemporalPath(image).then((src) => {
            this.addHtml(`
            <li class="img-button delete">
              <div class="img-box medium">
                <img src="${src}">
                <button class="bg-black rounded text offwhite small flex ai-center jc-center">
                  <i class="wmi wmi-close medium"></i>
                </button>
              </div>
            </li>
            `);
            resolve();
          })
        )
      );
    }
    return Promise.all(promiseArray).then(() => this.getHtml());
  }

  updateTemplate(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.setTemplateData('imageCount', String(this.state.images.length));
      this.makeImagesTemplate().then((result) => {
        this.setTemplateData('images', result);
        resolve();
      });
    });
  }

  render() {
    this.updateTemplate()
      .then(() => {
        this.appendView(AnimateType.DOWN, AnimateType.DOWN);
        this.addEventListener();
      })
      .catch(console.error);
  }
}
