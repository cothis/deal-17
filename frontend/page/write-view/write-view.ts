import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType, CATEGORIES } from '../../../types';
import './write-view.css';
import { ProductApi } from '../../core/api';

const template: string = `
<input id="fileInput" type="file" class="d-none" multiple accept=".gif, .jpg, .png">
<form class="d-flex grow col">
  <div id="writeView__header" class="header white p-5">
    <router-link to="@back" class="icon-wrapper">
      <i class="wmi wmi-chevron-left large"></i>
    </router-link>  
    <span class="text medium">글쓰기</span>
    <button id="requestWrite" type="button" class="icon-wrapper"><i class="wmi wmi-check large"></i>   
    </button>
  </div>
  <div id="writeForm" class="d-flex col grow p-5 border-y overflow-auto">
    <div class="d-flex gap-4 border-bottom">
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
        <input name="subject" type="text" class="write-input text large" placeholder="글 제목">
      </div>
      <div>
        <div class="text medium grey1">(필수)카테고리를 선택해주세요.</div>
        <ul class="category-list">
          {{__category-item__}}
        </ul>
      </div>
    </div>
    <div class="py-4 border-bottom">
    <input type="text" name="price" class="write-input" placeholder="₩ 가격(선택사항)">
    </div>
    <div class="py-4">
      <textarea name="content" class="write-input textarea"></textarea>
    </div>
  </div>
  <div class="location-bar p-5">
    <i class="wmi wmi-map-pin large"></i>
    역삼동
  </div>
</form>
`;

interface State {
  images: File[];
  category: string;
}

export default class WriteView extends View {
  private store: Store;
  private state: State;
  private api: ProductApi;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
    this.state = { images: [], category: '' };
    this.api = new ProductApi();
  }

  addEventListener() {
    if (!this.pageContainer) return;

    this.pageContainer.querySelector('.textarea')?.addEventListener('input', this.onTextareaInput);
    this.pageContainer.querySelector('#fileInput')?.addEventListener('change', this.onFileChange.bind(this));
    this.pageContainer.querySelector('#imgButton')?.addEventListener('click', this.onImgButtonClick.bind(this));
    this.pageContainer.querySelector('#imgList')?.addEventListener('click', this.onDeleteButtonClick.bind(this));
    this.pageContainer.querySelector('#requestWrite')?.addEventListener('click', this.onWriteButtonClick.bind(this));
    this.pageContainer.querySelector('.category-list')?.addEventListener('click', this.onCategoryListClick.bind(this));
  }

  onCategoryListClick(e: Event) {
    const target = (<HTMLElement>e.target).closest('.category-list-item');
    if (!target) return;

    this.state.category = (<HTMLElement>target).dataset.category ?? '';
  }

  onImgButtonClick() {
    (<HTMLElement>this.pageContainer?.querySelector('#fileInput')).click();
  }

  onWriteButtonClick(e: Event) {
    const formData = new FormData();
    this.state.images.forEach((image) => {
      formData.append('images', image, image.name);
    });
    formData.append('subject', 'hi');
    formData.append('price', '3000');
    formData.append('category', this.state.category);
    formData.append('content', 'content');

    console.log(formData);

    this.api.createProduct(formData).then(console.log);
  }

  onFileChange(e: Event) {
    const files = (<HTMLInputElement>e.target).files;
    if (!files) return;

    for (let i = 0; i < files?.length; i++) {
      if (this.state.images.length >= 10) break;

      this.state.images.push(files[i]);
    }

    this.updatePage();
  }

  onTextareaInput(e: Event) {
    // 자동 스크롤때문에 어쩔수없이 style 속성 사용
    const textarea = <HTMLElement>e.target;

    textarea.style.height = '1px';
    textarea.style.height = textarea.scrollHeight + 'px';
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

  onDeleteButtonClick(e: Event) {
    const button = (<HTMLElement>e.target).closest('button');
    if (!button) return;

    const li = button.closest('li');
    if (!li) return;

    const ul = li.closest('ul');
    if (!ul) return;

    const index = Array.from(ul.children).findIndex((child) => child === li);
    if (index >= 0) {
      this.state.images.splice(index, 1);
      this.updatePage();
    }
  }

  makeCategoryTempalte(): string {
    return CATEGORIES.map(
      (category) => `<li>
                      <button type="button" class="category-list-item" data-category="${category.name}">${category.name}</ㅠ>
                    </li>`
    ).join('');
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
                <button type="button" class="bg-black rounded text offwhite small flex ai-center jc-center">
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
      this.setTemplateData('category-item', this.makeCategoryTempalte());
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
