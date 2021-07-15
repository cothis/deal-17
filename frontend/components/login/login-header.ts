import View from '../../core/view';
import Store from '../../store';

const template = `
<button type="button" class="icon-wrapper">
  <img src="./frontend/static/images/icons/chevron-left.png">
</button>  
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
