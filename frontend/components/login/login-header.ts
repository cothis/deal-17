import View from '../../core/view';
import Store from '../../core/store';

const template = `
<a href="@back" class="icon-wrapper">
  <img src="./static/images/icons/chevron-left.png">
</a>  
<span class="text medium">{{__title__}}</span>
<button type="button" class="icon-wrapper"></button>
`;

interface Props {
  title: string;
}

export default class LoginHeaderComponent extends View {
  props: Props;

  constructor(containerId: string, store: Store, props: Props) {
    super(containerId, template);
    this.props = props;
  }

  render() {
    this.setTemplateData('title', this.props.title);
    this.updateView();
  }
}
