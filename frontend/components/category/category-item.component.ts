export class CategoryItem extends HTMLElement {
  private initHTML: string;
  private element: HTMLElement;
  private path: string;

  constructor() {
    super();
    this.initHTML = this.innerHTML;
    this.element = document.createElement('li');
    this.element.classList.add('category-item', 'flex', 'column', 'gap-4', 'jc-center', 'ai-center');

    this.render();
    this.element.addEventListener('click', (e) => {
      const categoryId = (<HTMLLIElement>e.currentTarget).dataset.categoryId;

      this.element.parentElement!.dispatchEvent(new CustomEvent('category-change', { detail: { categoryId } }));
    });

    this.path = '';
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
  }

  static get observedAttributes() {
    return ['path', 'id'];
  }

  render() {
    this.path = this.getAttribute('path') ?? '';
    this.element.dataset.categoryId = this.getAttribute('id') ?? '';

    this.element.innerHTML = `
      <div class="img-box">
        <img src="${this.path}">
      </div>
      <div>${this.initHTML}</div>
    `;
    this.replaceWith(this.element);
  }
}
