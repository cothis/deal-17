import { Product, Picture } from '../../types';

const BASE_URL: string = process.env.API_URL ?? 'http://localhost:8000';

export class Api {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  get<AjaxResponse>(path: string, OPTION?: RequestInit | undefined): Promise<AjaxResponse> {
    return fetch(`${BASE_URL}${this.basePath}${path}`, OPTION).then((response) => response.json());
  }
}

export class ProductApi extends Api {
  constructor() {
    super('/api/v0/products');
  }

  getAllProducts(): Promise<Product[]> {
    return this.get<Product[]>('');
  }
}

export class PictureApi extends Api {
  constructor() {
    super('/api/v0/pictures');
  }

  getPicturesById(productId: number): Promise<Picture[]> {
    return this.get<Picture[]>(`/${productId}`);
  }
}
