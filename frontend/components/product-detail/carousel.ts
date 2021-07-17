import { Picture } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="carouselComponent" class="slider">
    <div class="wrapper">
        <div id="slides" class="slides">
            {{__slide__}}
        </div>
    <div>
</div>
`;

interface Props {
  pictures: Picture[];
}

export default class Carousel extends View {
  private store: Store;
  private props: Props;
  private posX1: number = 0;
  private posX2: number = 0;
  private posInitial: number = 0;
  private posFinal: number = 0;
  private threshold: number = 100;
  private slides?: HTMLCollectionOf<Element>;
  private slidesLength?: number;
  private slideSize?: number;
  private firstSlide?: Element;
  private lastSlide?: Element;
  // private cloneFirst?: Node;
  // private cloneLast?: Node;
  private index: number = 0;
  private allowShift: boolean = true;
  private slider?: HTMLElement | null;
  private sliderItems?: HTMLElement | null;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  slide(warpper: HTMLElement) {
    this.slides = this.sliderItems!.getElementsByClassName('slide');
    this.slidesLength = this.slides.length;
    this.slideSize = (this.sliderItems!.getElementsByClassName('slide')[0] as HTMLElement).offsetWidth;
    this.firstSlide = this.slides[0];
    this.lastSlide = this.slides[this.slidesLength - 1];
    // this.cloneFirst = this.firstSlide.cloneNode(true);
    // this.cloneLast = this.lastSlide.cloneNode(true);

    // this.sliderItems!.appendChild(this.cloneFirst);
    // this.sliderItems!.insertBefore(this.cloneLast, this.firstSlide);
    warpper.classList.add('loaded');

    // mouse events
    this.sliderItems!.onmousedown = this.dragStart.bind(this);

    // touch events
    this.sliderItems!.addEventListener('touchstart', this.dragStart.bind(this));
    this.sliderItems!.addEventListener('touchend', this.dragEnd.bind(this));
    this.sliderItems!.addEventListener('touchmove', this.dragAction.bind(this));

    // click events

    // transition events
    this.sliderItems!.addEventListener('transitionend', this.checkIndex.bind(this));
  }

  dragStart(e: TouchEvent | MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    this.posInitial = this.sliderItems!.offsetLeft;

    if (e.type == 'touchstart') {
      this.posX1 = (e as TouchEvent).touches[0].clientX;
    } else {
      this.posX1 = (e as MouseEvent).clientX;
      document.onmouseup = this.dragEnd.bind(this);
      document.onmousemove = this.dragAction.bind(this);
    }
  }

  dragAction(e: TouchEvent | MouseEvent) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      this.posX2 = this.posX1 - (e as TouchEvent).touches[0].clientX;
      this.posX1 = (e as TouchEvent).touches[0].clientX;
    } else {
      this.posX2 = this.posX1 - (e as MouseEvent).clientX;
      this.posX1 = (e as MouseEvent).clientX;
    }
    if (this.sliderItems!.offsetLeft > 0) {
      this.sliderItems!.style.left = 0 + 'px';
    } else if (this.sliderItems!.offsetLeft < window.screen.width * -1 * (this.slidesLength! - 1)) {
      this.sliderItems!.style.left = window.screen.width * -1 * (this.slidesLength! - 1) + 'px';
    } else {
      this.sliderItems!.style.left = this.sliderItems!.offsetLeft - this.posX2 + 'px';
    }
  }

  dragEnd(e: TouchEvent | MouseEvent) {
    this.posFinal = this.sliderItems!.offsetLeft;
    if (this.posFinal - this.posInitial < -this.threshold) {
      this.shiftSlide(1, 'drag');
    } else if (this.posFinal - this.posInitial > this.threshold) {
      this.shiftSlide(-1, 'drag');
    } else {
      this.sliderItems!.style.left = this.posInitial + 'px';
    }
    // console.log(this.posInitial)
    document.onmouseup = null;
    document.onmousemove = null;
  }

  shiftSlide(dir: number, action: string) {
    this.sliderItems?.classList.add('shifting');

    if (this.allowShift) {
      if (!action) {
        this.posInitial = this.sliderItems!.offsetLeft;
      }

      if (dir == 1) {
        this.sliderItems!.style.left = this.posInitial - this.slideSize! + 'px';
        this.index++;
      } else if (dir == -1) {
        this.sliderItems!.style.left = this.posInitial + this.slideSize! + 'px';
        this.index--;
      }
      console.log(this.posInitial, this.slideSize);
    }

    this.allowShift = false;
  }

  checkIndex() {
    this.sliderItems!.classList.remove('shifting');

    if (this.index == -1) {
      this.sliderItems!.style.left = -(this.slidesLength! * this.slideSize!) + 'px';
      this.index = this.slidesLength! - 1;
    }

    if (this.index == this.slidesLength) {
      this.sliderItems!.style.left = -(1 * this.slideSize!) + 'px';
      this.index = 0;
    }

    this.allowShift = true;
  }

  initCarousel() {
    this.slider = document.getElementById('carouselComponent');
    this.sliderItems = document.getElementById('slides');
    console.log(this.sliderItems);

    this.slide(this.slider!);
  }

  render() {
    console.log(this.props.pictures);
    let i = 0;
    this.props.pictures.forEach((picture) => {
      this.addHtml(`<img src="${picture.path}" class="slide" />`);
    });
    const html = this.getHtml();
    console.log(html);
    this.setTemplateData('slide', html);
    this.updateView();

    this.initCarousel();
  }
}
