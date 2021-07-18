import View from '../../core/view';
import Store from '../../core/store';

const template = `
<a href="@back" class="icon-wrapper">
  <img src="./static/images/icons/chevron-left.png">
</a>  
<span class="text medium">로그인</span>
<button type="button" class="icon-wrapper"></button>
`;

export default class LoginHeaderComponent extends View {
  constructor(containerId: string, store: Store) {
    super(containerId, template);
  }

  render() {
    this.updateView();
  }
}
