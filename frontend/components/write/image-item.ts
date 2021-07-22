import View from '../../core/view';

const template = `
<li class="img-button delete">
  <div class="img-box medium">
    <img src="{{__image-path__}}">
    <button type="button" class="bg-black rounded text offwhite small flex ai-center jc-center">
      <i class="wmi wmi-close medium"></i>
    </button>
  </div>
</li>
`;

interface Props {
  image: File;
  images: File[];
  lengthIndicator: HTMLElement;
}

export class ImageItemComponent extends View {
  props: Props;
  component?: HTMLElement;

  constructor(selector: string, props: Props) {
    super(selector, template);
    this.props = props;

    this.render();
  }

  getTemporalPath(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', (e) => {
        resolve(String((<FileReader>e.target).result));
      });
      fileReader.readAsDataURL(file);
    });
  }

  onDeleteButtonClick(e: Event) {
    const button = (<HTMLElement>e.target).closest('button');
    if (!button) return;

    const li = button.closest('li');
    if (li === this.component) this.component.remove();

    const index = this.props.images.findIndex((image) => image === this.props.image);
    this.props.images.splice(index, 1);
    this.props.lengthIndicator.innerHTML = `${this.props.images.length}/10`;
  }

  registerEventListeners() {
    this.component!.addEventListener('click', this.onDeleteButtonClick.bind(this));
  }

  render() {
    this.getTemporalPath(this.props.image).then((fakepath) => {
      this.setTemplateData('image-path', fakepath);
      this.component = this.appendComponent();
      this.registerEventListeners();
    });
  }
}
