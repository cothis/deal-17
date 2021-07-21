import View from '../../core/view';
import Store from '../../core/store';

const template = `
<button id="{{__id__}}" type="button" class="button large link medium my-2">{{__title__}}</button>
`;

interface Props {
  title: string;
  id: string;
  onClick: () => void;
}

export default class LoginButtonComponent extends View {
  containerId: string;
  store: Store;
  props: Props;

  constructor(containerId: string, store: Store, props: Props) {
    super(containerId, template);
    this.containerId = containerId;
    this.store = store;
    this.props = props;
  }

  onClick(e: Event) {
    this.props.onClick();
  }

  render() {
    this.setTemplateData('id', this.props.id);
    this.setTemplateData('title', this.props.title);
    this.appendComponent();

    this.container.querySelector(`#${this.props.id}`)?.addEventListener('click', this.props.onClick);
  }
}
