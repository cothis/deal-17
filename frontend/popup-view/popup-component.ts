import View from '../core/view';
import Store from '../core/store';
import './popup-component.css';

const template: string = `
<div class="zindex-100 backdrop"></div>
<div class="modal popup {{__inputState__}}">
  {{__title__}}
  {{__input__}}
  <div class="button-bar">
    <button type="button" id="close">취소</button>
    <button type="button" id="ok">{{__okText__}}</button>
  </div>
</div>
`;

export interface Props {
  title?: string;
  input?: {
    label?: string;
    placeholder?: string;
    regex?: RegExp;
  };
  isAlert?: boolean;
  okText: string;
  okClickHandler: (e: Event) => void;
}

export default class PopupComponent extends View {
  private store: Store;
  private props: Props;
  private inputState: string = '';
  private okClickHandler: (e: Event) => void;

  constructor(containerId: string, store: Store, props: Props) {
    super(containerId, template);

    this.store = store;
    this.props = props;

    if (this.props.isAlert) {
      this.inputState = 'alert';
    }

    this.okClickHandler = this.props.okClickHandler;
  }

  render() {
    let title = '';
    if (this.props.title) {
      title = `<div class="title">${this.props.title}</div>`;
    }

    let input = '';
    if (this.props.input) {
      input = `
      <div class="input--wrapper">
        <label>${this.props.input.label}</label>
        <input id="popupText" class="input large" type="text" placeholder="${this.props.input.placeholder}">
      </div>`;
    }

    this.setTemplateData('title', title);
    this.setTemplateData('inputState', this.inputState);
    this.setTemplateData('input', input);
    this.setTemplateData('okText', this.props.okText);

    this.appendComponent();
    this.container.classList.remove('display-none');

    this.container.querySelector('#close')?.addEventListener('click', (e) => {
      this.container.classList.add('display-none');
      this.container.innerHTML = '';
    });

    this.container.querySelector('input')?.addEventListener('input', (e) => {
      const value = (<HTMLInputElement>e.target).value;
      if (value.length > 0) {
        this.container.querySelector('.modal')?.classList.add('filled');
      } else {
        this.container.querySelector('.modal')?.classList.remove('filled');
      }
    });

    this.container.querySelector('#ok')?.addEventListener('click', (e) => {
      if (!this.props.input || this.container.querySelector('input')?.value) {
        this.okClickHandler(e);
        this.container.classList.add('display-none');
        this.container.innerHTML = '';
      }
    });
  }
}
