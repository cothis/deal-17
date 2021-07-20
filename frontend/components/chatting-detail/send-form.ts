import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div class="chatbar">
    <input type="text" class="grow input large" placeholder="{{__placeholder__}}" />
    <i class="wmi wmi-send grey1 large"></i>
</div>
`;

interface Props {
  placeholder: string;
}

export default class SendFormComponent extends View {
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

    this.updateView();
  }
}
