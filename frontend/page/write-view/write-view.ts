import View from '../../core/view';
import Store from '../../core/store';
import { AnimateType, CATEGORIES } from '../../../types';
import './write-view.css';
import { ProductApi } from '../../core/api';
import { RouterEvent } from '../../core/router';
import { ImageItemComponent } from '../../components/write/image-item';

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
      </ul>
    </div>
    <div class="py-4 border-bottom">
      <div>
        <input id="subject" name="subject" type="text" class="write-input text large" placeholder="글 제목">
      </div>
      <div>
        <div class="text medium grey1">(필수)카테고리를 선택해주세요.</div>
        <ul class="category-list">
          {{__category-item__}}
        </ul>
      </div>
    </div>
    <div class="py-4 border-bottom">
    <input id="price" type="text" name="price" class="write-input" placeholder="₩ 가격(선택사항)">
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
  categoryId: number;
}

export default class WriteView extends View {
  private store: Store;
  private state: State;
  private api: ProductApi;

  constructor(containerId: string, store: Store) {
    super(containerId, template);
    this.store = store;
    this.state = { images: [], categoryId: 0 };
    this.api = new ProductApi();
  }

  addEventListener() {
    if (!this.pageContainer) return;

    this.pageContainer.querySelector('.textarea')?.addEventListener('input', this.onTextareaInput);
    this.pageContainer.querySelector('#fileInput')?.addEventListener('change', this.onFileChange.bind(this));
    this.pageContainer.querySelector('#imgButton')?.addEventListener('click', this.onImgButtonClick.bind(this));
    this.pageContainer.querySelector('#requestWrite')?.addEventListener('click', this.onWriteButtonClick.bind(this));
    this.pageContainer.querySelector('.category-list')?.addEventListener('click', this.onCategoryListClick.bind(this));
  }

  onCategoryListClick(e: Event) {
    const target = (<HTMLElement>e.target).closest('.category-list-item');
    if (!target) return;

    this.state.categoryId = parseInt((<HTMLElement>target).dataset.category ?? '0');
  }

  onImgButtonClick() {
    (<HTMLElement>this.pageContainer?.querySelector('#fileInput')).click();
  }

  onWriteButtonClick(e: Event) {
    const formData = new FormData();
    this.state.images.forEach((image) => {
      formData.append('images', image, image.name);
    });
    formData.append('subject', (<HTMLInputElement>this.pageContainer?.querySelector('#subject'))?.value ?? '');
    formData.append('price', (<HTMLInputElement>this.pageContainer?.querySelector('#price'))?.value ?? '');
    formData.append('categoryId', String(this.state.categoryId));
    formData.append('content', this.pageContainer?.querySelector('textarea')?.value ?? '');
    formData.append('sellerId', String(this.store.user?.id ?? 1));

    console.log(formData);

    this.api.createProduct(formData).then((res) => {
      if (res.result === 'ok') {
        RouterEvent.dispatchEvent('@back');
      }
    });
  }

  onFileChange(e: Event) {
    const files = (<HTMLInputElement>e.target).files;
    if (!files) return;

    for (let i = 0; i < files?.length; i++) {
      if (this.state.images.length >= 10) break;

      this.state.images.push(files[i]);
    }

    this.updateImgList();
  }

  onTextareaInput(e: Event) {
    // 자동 스크롤때문에 어쩔수없이 style 속성 사용
    const textarea = <HTMLElement>e.target;

    textarea.style.height = '1px';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  updateImgList() {
    const lengthIndicator = <HTMLElement>this.pageContainer?.querySelector('#imgButton > span');
    lengthIndicator.innerHTML = `${this.state.images.length}/10`;
    const $imgList = this.pageContainer?.querySelector('#imgList');
    if ($imgList) {
      $imgList.innerHTML = '';
      this.state.images.forEach(
        (image) => new ImageItemComponent('#imgList', { images: this.state.images, image, lengthIndicator })
      );
    }
  }

  makeCategoryTempalte(): string {
    return CATEGORIES.map(
      (category) => `<li>
                      <button type="button" class="category-list-item" data-category="${category.id}">${category.name}</ㅠ>
                    </li>`
    ).join('');
  }

  updateTemplate() {
    this.setTemplateData('imageCount', String(this.state.images.length));
    this.setTemplateData('category-item', this.makeCategoryTempalte());
  }

  render() {
    this.updateTemplate();
    this.appendView(AnimateType.DOWN, AnimateType.DOWN);
    this.addEventListener();
  }
}
