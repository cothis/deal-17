import Store from './store';
import View from './view';

class Observer {
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

  notifyObserver(store: Store) {
    this.observers.forEach((observer) => observer.setState(store));
  }
}
