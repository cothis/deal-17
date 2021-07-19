import { RouterEvent } from '../../core/router';
import './router-link.css';

export class Link extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', function () {
      RouterEvent.dispatchEvent(this.getAttribute('to'), false);
    });
  }
}
