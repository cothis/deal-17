import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div class="header white p-5">
    <router-link to="@back" class="icon-wrapper">
        <i class="wmi wmi-chevron-left large"></i>
    </router-link>  
    <span class="text medium">{{__title__}}</span>
    <button type="button" class="icon-wrapper"></button>  
</div>
`;

interface Props {
  title: string;
}

export default class HeaderOffwhite extends View {
  props: Props;

  constructor(containerId: string, store: Store, props: Props) {
    super(containerId, template);
    this.props = props;
  }

  render() {
    this.setTemplateData('title', this.props.title);
    this.appendComponent();
  }
}
