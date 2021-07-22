import { UserStore, ProductStore, User, Product, Town } from '../../types';
import { Observer } from './observer';

export default class Store implements UserStore, ProductStore {
  private _user: User | null;
  private _auth: string;
  private _currentPage: number;
  private _products: Product[];
  private _towns: Town[];
  observer: Observer;

  constructor() {
    this._user = null;
    this._auth = '';
    this._currentPage = 1;
    this._products = [];
    this._towns = [];
    this.observer = new Observer();
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(number: number) {
    this._currentPage = number;
    this.observer.notifyObserver();
  }

  get user(): User | null {
    return this._user;
  }

  set user(user: User | null) {
    this._user = user;
    this.observer.notifyObserver();
  }

  get towns(): Town[] {
    return this._towns;
  }

  set towns(towns) {
    this._towns = towns;
    this.observer.notifyObserver();
  }

  get auth(): string {
    return this._auth;
  }

  set auth(auth: string) {
    this.auth = auth;
    this.observer.notifyObserver();
  }

  get products() {
    return this._products;
  }

  set products(products: Product[]) {
    this._products = products;
    this.observer.notifyObserver();
  }

  getAllProducts() {
    return this._products;
  }

  getProduct(id: number): Product | undefined {
    return this._products.find((product) => product.id === id);
  }
}
