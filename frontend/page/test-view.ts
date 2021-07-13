import View from '../core/view';

const template = `
<div>
  <h1>Test Rendering</h1>
  <div>{{__test__}}</div>
  <a href="another">another</a>
</div>
`;

export default class TestView extends View {
  constructor(containerId: string) {
    super(containerId, template);
  }

  render() {
    this.setTemplateData('test', 'hi');

    this.updateView();
  }
}
