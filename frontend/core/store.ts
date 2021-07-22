import { UserStore, ProductStore, User, Product, Town, Category } from '../../types';
import { Observer } from './observer';

export default class Store implements UserStore, ProductStore {
  private _user: User | null;
  private _auth: string;
  private _currentPage: number;
  private _products: Product[];
  private _towns: Town[];
  private _category: Category | null;
  observer: Observer;

  constructor() {
    this._user = null;
    this._auth = '';
    this._currentPage = 1;
    this._products = [];
    this._towns = [];
    this._category = null;
    this.observer = new Observer();
  }

  get category(): Category | null {
    return this._category;
  }

  set category(category: Category | null) {
    this._category = category;
    this.observer.notifyObserver();
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

  set towns(towns: Town[]) {
    this._towns = towns;
  }

  deleteTown(index: number) {
    this._towns = this._towns.filter((town, i) => i != index);
    this._towns[0].isActive = true;
    this.observer.notifyObserver();
  }

  addTown(town: Town) {
    this._towns.push(town);
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
