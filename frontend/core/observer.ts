import View from './view';

export class Observer {
  observers: View[];

  constructor() {
    this.observers = [];
  }

  registerObserver(observer: View) {
    this.observers.push(observer);
  }

  unregisterObserver(observer: View) {
    this.observers = this.observers.filter((registed) => registed !== observer);
  }

  notifyObserver() {
    this.observers.forEach((observer) => observer.onStoreChange());
  }
}
