import View from '../../core/view';
import Store from '../../core/store';
import { SideViewType } from '../../page/main-view';

const template = `
<div class="header-container flex grow">
    <div class="header-center link medium white flex ai-center jc-center">
      <img src="/static/images/icons/map-pin.png">
      <div>장소</div>
    </div>
    <div class="header-left">
      <img src="/static/images/icons/category.png">
    </div>
    <div class="header-right flex">
      <a href="/login"><img id="headerUserButton" src="/static/images/icons/user.png"></a>
      <img id="headerMenuButton" src="/static/images/icons/menu.png">
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
