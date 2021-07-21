import Store from '../../core/store';

export class CategoryItem extends HTMLElement {
  private initHTML: string;
  private element: HTMLElement;

  constructor() {
    super();
    this.initHTML = this.innerHTML;
    this.element = document.createElement('li');
    this.element.classList.add('category-item', 'flex', 'column', 'gap-4', 'jc-center', 'ai-center');

    this.render();
    this.addEventListener('click', (e) => {
      console.log(e.currentTarget);
    });
  }

  render() {
    this.element.innerHTML = `
      <div class="img-box"></div>
      <div>${this.initHTML}</div>
    `;
    this.replaceWith(this.element);
  }
}
