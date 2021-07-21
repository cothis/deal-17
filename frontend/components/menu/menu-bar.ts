import Store from '../../core/store';
import View from '../../core/view';

const template = `
<div id="menuBarComponent" class="tap-bar">
    {{__tap__}}
</div>
`;

interface Props {
  items: Array<{ id: number; label: string; active: boolean }>;
  onClick: (id: number) => void;
}

export default class MenuBar extends View {
  private store: Store;
  private props: Props;
  private activeMenuId!: number;

  constructor(constructorId: string, store: Store, props: Props) {
    super(constructorId, template);
    this.store = store;
    this.props = props;
    this.activeMenuId = this.props.items.find((item) => item.active)!.id;
  }

  onClickHandler(e: Event) {
    e.stopPropagation();
    this.activeMenuId = Number((e.target as HTMLElement).id);
    this.props.onClick(this.activeMenuId);
    this.render();
  }

  render() {
    this.props.items.forEach((item) => {
      this.addHtml(
        `<div id="${item.id}" class="tap ${item.id === this.activeMenuId ? 'active' : ''}">${item.label}</div>`
      );
    });
    this.setTemplateData('tap', this.getHtml());
    this.updateView();

    const root = document.querySelector('#menuBarComponent');
    root?.addEventListener('click', this.onClickHandler.bind(this));
  }
}
