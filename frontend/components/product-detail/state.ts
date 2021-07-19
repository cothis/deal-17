import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="stateComponent" class="status link small">
{{__state__}}
</div>
`;

interface Props {
    state: number;
}

export default class State extends View {
  private store: Store;
  private props: Props;
  private state: string;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
    this.state = '';
  }

  render() {
    // this.addHtml('');
    // const state = this.getHtml();
    switch(this.props.state) {
      case 0:
        this.state = '판매중';
        break;
      case 1:
        this.state = '예약중';
        break;
      case 2:
        this.state = '거래완료';
        break;

    }
    this.setTemplateData('state', this.state);

    this.appendComponent();
  }
}
