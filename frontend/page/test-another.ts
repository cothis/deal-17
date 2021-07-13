import View from '../core/view';

const template = `
<div>
  <h1>Test Another</h1>
  <div>{{__test__}}</div>
</div>
`;

export default class TestAnotherView extends View {
  constructor(containerId: string) {
    super(containerId, template);
  }

  render() {
    this.setTemplateData('test', 'another rendering?');

    this.updateView();
  }
}
