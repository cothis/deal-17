import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="titleComponent">
{{__title__}}
</div>
`;

interface Props {
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
    this.addHtml('<div class="text large">빈티지 롤러 스케이트</div>');
    this.addHtml('<div class="text xsmall grey1 x-mt-8">기타 중고물품&middot;4시간 전</div>');
    const title = this.getHtml();
    this.setTemplateData('title', title);

    this.appendComponent();
  }
}
