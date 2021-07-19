import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="footerComponent">
    <div class="product-bar">
        <div class="flex grow w-20">
            <div>하트</div>
            <div>|</div>
            <div>가격</div>
        </div>
        <div class="flex grow jc-end w-20">
            <div class="button link small">채팅 목록 보기</div>
        </div>
    </div>
</div>
`;

interface Props {
}

export default class Footer extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.addHtml('');
    const footer = this.getHtml();
    this.setTemplateData('footer', footer);

    this.appendComponent();
  }
}
