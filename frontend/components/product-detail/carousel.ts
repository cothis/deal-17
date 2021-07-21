import { Picture } from '../../../types';
import View from '../../core/view';
import Store from '../../core/store';

const template = `
<div id="carouselComponent" class="slider">
    <div class="wrapper">
        <div id="slides" class="slides">
          {{__slide__}}
        </div>
        <div id="indicators" class="img-navigation">
          {{__indicator__}}
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
  private index: number = 0;
  private allowShift: boolean = true;
  private slider?: HTMLElement | null;
  private sliderItem?: HTMLElement | null;
  private indicator?: HTMLElement | null;
  private indicators?: HTMLCollectionOf<Element>;

  constructor(selector: string, store: Store, props: Props) {
    super(selector, template);
    this.store = store;
    this.props = props;
  }

  slide(warpper: HTMLElement) {
    this.slides = this.sliderItem!.getElementsByClassName('slide');
    this.slidesLength = this.slides.length;
    this.slideSize = (this.sliderItem!.getElementsByClassName('slide')[0] as HTMLElement).offsetWidth;
    this.firstSlide = this.slides[0];
    this.lastSlide = this.slides[this.slidesLength - 1];
    this.indicators = this.indicator!.getElementsByClassName('img-nav');

    warpper.classList.add('loaded');

    this.sliderItem!.onmousedown = this.dragStart.bind(this);

    // touch events
    this.sliderItem!.addEventListener('touchstart', this.dragStart.bind(this));
    this.sliderItem!.addEventListener('touchend', this.dragEnd.bind(this));
    this.sliderItem!.addEventListener('touchmove', this.dragAction.bind(this));

    // click events

    // transition events
    this.sliderItem!.addEventListener('transitionend', this.checkIndex.bind(this));

    // indicator event
    this.indicator!.addEventListener('click', this.clickIndicator.bind(this));
  }

  dragStart(e: TouchEvent | MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    this.posInitial = this.sliderItem!.offsetLeft;

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

    const maxLeft = 0;
    const maxRight = -window.innerWidth * (this.slidesLength! - 1);
    const isOverLeft = this.sliderItem!.offsetLeft > maxLeft;
    const isOverRight = this.sliderItem!.offsetLeft < maxRight;
    const nextX = this.sliderItem!.offsetLeft - this.posX2;

    if (isOverLeft) {
      this.sliderItem!.style.left = `${maxLeft}px`;
    } else if (isOverRight) {
      this.sliderItem!.style.left = `${maxRight}px`;
    } else {
      this.sliderItem!.style.left = `${nextX}px`;
    }
  }

  dragEnd(e: TouchEvent | MouseEvent) {
    this.posFinal = this.sliderItem!.offsetLeft;
    if (this.posFinal - this.posInitial < -this.threshold) {
      this.shiftSlide(1, 'drag');
    } else if (this.posFinal - this.posInitial > this.threshold) {
      this.shiftSlide(-1, 'drag');
    } else {
      this.sliderItem!.style.left = this.posInitial + 'px';
    }
    document.onmouseup = null;
    document.onmousemove = null;
  }

  clickIndicator(e: Event) {
    const indicatorIndex = Number((e.target as HTMLElement).dataset.index);
    if (isNaN(indicatorIndex) || indicatorIndex == null || indicatorIndex === this.index) {
      return;
    }
    this.shiftSlide(indicatorIndex - this.index, '');
  }

  shiftSlide(step: number, action: string) {
    this.sliderItem?.classList.add('shifting');
    if (this.allowShift) {
      if (!action) {
        this.posInitial = this.sliderItem!.offsetLeft;
      }

      this.sliderItem!.style.left = this.posInitial - step * this.slideSize! + 'px';
      this.indicator?.getElementsByClassName('img-nav')[this.index].classList.remove('active');
      this.index += step;
      this.indicator?.getElementsByClassName('img-nav')[this.index].classList.add('active');
    }
    this.allowShift = false;
  }

  checkIndex() {
    this.sliderItem!.classList.remove('shifting');

    if (this.index == -1) {
      this.sliderItem!.style.left = -(this.slidesLength! * this.slideSize!) + 'px';
      this.index = this.slidesLength! - 1;
    }

    if (this.index == this.slidesLength) {
      this.sliderItem!.style.left = -(1 * this.slideSize!) + 'px';
      this.index = 0;
    }

    this.allowShift = true;
  }

  initCarousel() {
    this.slider = document.getElementById('carouselComponent');
    this.sliderItem = document.getElementById('slides');
    this.indicator = document.getElementById('indicators');
    this.indicator?.getElementsByClassName('img-nav')[this.index].classList.add('active');

    this.slide(this.slider!);
  }

  render() {
    this.props.pictures.forEach((picture) => {
      this.addHtml(`<div><img src="${picture.path}" class="slide" /><div class="image gradient"></div></div>`);
    });
    const slide = this.getHtml();
    this.setTemplateData('slide', slide);

    this.props.pictures.forEach((_, i) => {
      this.addHtml(`<div data-index=${i} class="img-nav"></div>`);
    });
    const indicator = this.getHtml();
    this.setTemplateData('indicator', indicator);
    this.updateView();

    this.initCarousel();
  }

  setState(store: Store) {}
}
