import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="stateComponent">
{{__state__}}
</div>
`;

interface Props {
//   pictures: Picture[];
}

export default class State extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.addHtml('<div class="status link small">판매중 > </div>');
    const state = this.getHtml();
    this.setTemplateData('state', state);

    this.appendComponent();
  }
}
