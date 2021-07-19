import View from '../../core/view';
import Store from '../../core/store';
import { SideViewType } from '../../page/main-view';

const template = `
<div class="header-container flex grow">
    <div class="header-center link medium white flex ai-center jc-center">
      <i class="wmi wmi-map-pin small"></i>
      <router-link to="/town">장소</router-link>
      <!-- todo 임시로 페이지 이동되게 만들어둠. 추후 셀렉트 옵션에서 이동되야함 -->
    </div>
    <div class="header-left">
      <router-link to="/category">
        <i class="wmi wmi-category large"></i>
      </router-link>
    </div>
    <div class="header-right flex">
      <a href="/login"><i class="wmi wmi-user large"></i></a>
      <i class="wmi wmi-menu large"></i>
    </div>
</div>
`;

interface Props {
  // showSideView: (type: SideViewType) => void;
}

export default class Header extends View {
  private store: Store;
  private props: Props;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  // onUserClickHandler() {
  //   this.props.showSideView(SideViewType.USER);
  // }

  // onMenuClickHandler() {
  //   this.props.showSideView(SideViewType.MENU);
  // }

  render() {
    this.updateView();

    // const headerUserButton = document.querySelector('#headerUserButton');
    // headerUserButton!.addEventListener('click', () => this.onUserClickHandler());

    // const headerMenuButton = document.querySelector('#headerMenuButton');
    // headerMenuButton!.addEventListener('click', this.onMenuClickHandler);
  }
}
