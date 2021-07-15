import { Product } from '../../types';

// const API_URL: string = process.env.API_URL ?? 'http://localhost:8000';
const API_URL: string = 'http://localhost:8000';

export class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get<AjaxResponse>(OPTION?: RequestInit | undefined): Promise<AjaxResponse> {
    return fetch(API_URL + this.url, OPTION).then((response) => response.json());
  }
}

export class ProductApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getAllProducts(): Promise<Product[]> {
    return this.get<Product[]>();
  }
}
