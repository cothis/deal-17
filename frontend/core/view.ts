import { request } from 'express';
import { AnimateType } from '../../types';

export default abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  private htmlList: string[];
  private pageContainer?: HTMLElement;
  private renderAnimate?: AnimateType;
  private removeAnimate?: AnimateType;

  constructor(selector: string, template: string) {
    const containerElement = <HTMLElement>document.querySelector(selector);

    if (!containerElement) {
      throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.';
    }

    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected updateView(): void {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  }

  protected appendView(renderAnimate?: AnimateType, removeAnimate?: AnimateType): void {
    this.renderAnimate = renderAnimate;
    this.removeAnimate = removeAnimate;

    this.pageContainer = document.createElement('section');
    this.pageContainer.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;

    this.pageContainer.classList.add('container');
    if (this.renderAnimate) {
      this.pageContainer.classList.add(`animate-${this.renderAnimate.toString()}`);
    }
    this.container.appendChild(this.pageContainer);

    if (this.renderAnimate) {
      requestAnimationFrame(() => {
        this.pageContainer?.classList.remove(`animate-${this.renderAnimate?.toString()}`);
      });
    }
  }

  protected appendComponent(): void {
    const $div = document.createElement('div');
    $div.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
    Array.from($div.children).forEach((child) => this.container.appendChild(child));
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join('');
    this.clearHtmlList();
    return snapshot;
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  abstract render(): void;
  remove(): void {
    if (this.removeAnimate) {
      this.pageContainer?.addEventListener('transitionend', this.pageContainer.remove);
      this.pageContainer?.classList.add(`animate-${this.removeAnimate.toString()}`);
    } else {
      this.pageContainer?.remove();
    }
  }
}
