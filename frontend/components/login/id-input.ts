import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div class="my-2 d-flex col">
  {{__label__}}
  <input type="text" class="input large my-2" placeholder="{{__placeholder__}}">
</div>
`;

interface Props {
  placeholder: string;
  label?: string;
  regex?: RegExp;
  setState: (value: string) => void;
}

export default class InputComponent extends View {
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
    this.setTemplateData('placeholder', this.props.placeholder);
    if (this.props.label) {
      this.setTemplateData('label', `<label>${this.props.label}</label>`);
    } else {
      this.setTemplateData('label', '');
    }
    this.updateView();

    this.container.addEventListener('input', (e) => {
      const value = (<HTMLInputElement>e.target).value;
      this.props.setState(value);
    });
  }
}
