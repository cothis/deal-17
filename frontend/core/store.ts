import {
  UserStore,
  ProductStore,
  User,
  Category,
  Product,
  ChatRoom,
  Town,
  UserTown,
  Picture,
  Wish,
  Message,
} from '../../types';

export default class Store implements UserStore, ProductStore {
  private _user: User | null;
  private _auth: string;
  private _currentPage: number;
  private products: Product[];

  constructor() {
    this._user = null;
    this._auth = '';
    this._currentPage = 1;
    this.products = [];
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(number: number) {
    this._currentPage = number;
  }

  get user(): User | null {
    return this._user;
  }

  set user(user: User | null) {
    this._user = user;
  }

  get auth(): string {
    return this._auth;
  }

  getAllProducts() {
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
