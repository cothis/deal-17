import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="contentComponent">
{{__content__}}
</div>
`;

interface Props {
}

export default class Content extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  render() {
    this.addHtml(`<div class="text large">어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해 드립니다. 단품 입고 되었습니다.
    새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235 입니다.</div>`);
    this.addHtml('<div class="text xsmall grey1 x-mt-8">채팅 0 &middot; 관심 0 &middot; 조회 1</div>');
    const content = this.getHtml();
    this.setTemplateData('content', content);

    this.appendComponent();
  }
}
