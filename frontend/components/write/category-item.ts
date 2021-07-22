import { Category } from '../../../types';
import View from '../../core/view';

const template = `
<li>
  <button type="button" class="category-list-item" data-category="{{__category-id__}}">
    {{__category-name__}}
  </button>
</li>
`;

interface Props {
  category: Category;
  setCategoryId: (categoryID: number) => void;
}

export class CategoryItemComponent extends View {
  props: Props;
  component?: HTMLElement;

  constructor(selector: string, props: Props) {
    super(selector, template);
    this.props = props;

    this.render();
  }

  onButtonClick(e: Event) {
    this.props.setCategoryId(this.props.category.id);
  }

  registerEventListeners() {
    this.component!.addEventListener('click', this.onButtonClick.bind(this));
  }

  render() {
    this.setTemplateData('category-id', String(this.props.category.id));
    this.setTemplateData('category-name', this.props.category.name);
    this.component = this.appendComponent();
    this.registerEventListeners();
  }
}
