import View from '../core/view';
import Store from '../store';

const template: string = `
<div>h1</div>
`;

export default class LoginView extends View {
  constructor(containerId: string, store: Store) {
    super(containerId, template);
  }
  render() {
    this.updateView();
  }
}
