import View from '../../core/view';
import Store from '../../core/store';

const template = `
<button id="{{__id__}}" type="button" class="button large link medium my-2">{{__title__}}</button>
`;

interface Props {
  title: string;
  id: string;
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

  render() {
    this.setTemplateData('id', this.props.id);
    this.setTemplateData('title', this.props.title);
    this.appendComponent();
  }
}
