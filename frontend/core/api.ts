import { Product, Picture, ChatRoom, Wish, User, Town } from '../../types';
import qs from 'querystring';

const BASE_URL: string = process.env.API_URL ?? 'http://localhost:8000';

export class Api {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  request<AjaxResponse>(path: string, OPTION?: RequestInit | undefined): Promise<AjaxResponse> {
    return fetch(`${BASE_URL}${this.basePath}${path}`, { ...OPTION, credentials: 'include', mode: 'cors' }).then(
      (response) => response.json()
    );
  }
}

export class SessionApi extends Api {
  constructor() {
    super('/session');
  }

  getSession(): Promise<any> {
    return this.request<any>('');
  }
}

export class ProductApi extends Api {
  constructor() {
    super('/api/v0/products');
  }

  getAllProducts(param: {
    type: string;
    userId: number;
    wishId?: number;
    townId?: number;
    chatRoomId?: number;
    categoryId?: number;
    page?: number;
    pageSize?: number;
  }): Promise<Product[]> {
    return this.request<Product[]>(`?${qs.stringify(param)}`);
  }

  getProductById(productId: number, param: { type: string; userId: number }): Promise<Product> {
    return this.request<Product>(`/${productId}?${qs.stringify(param)}`);
  }

  createProduct(formData: FormData): Promise<any> {
    const option: RequestInit = {
      method: 'post',
      headers: {},
      body: formData,
    };
    return this.request<any>('', option);
  }

  updateProduct(productId: number, formData: FormData): Promise<any> {
    const option: RequestInit = {
      method: 'put',
      headers: {},
      body: formData,
    };
    return this.request<any>(`/${productId}`, option);
  }

  updateProductState(id: number, state: number): Promise<void> {
    const option: RequestInit = {
      method: 'put',
      body: JSON.stringify({ state }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.request<void>(`/${id}/state`, option);
  }
}

export class PictureApi extends Api {
  constructor() {
    super('/api/v0/pictures');
  }

  getPicturesByProductId(productId: number): Promise<Picture[]> {
    return this.request<Picture[]>(`/${productId}`);
  }
}

export class UserApi extends Api {
  constructor() {
    super('/api/v0/users');
  }

  getUserById(id: number): Promise<User[]> {
    return this.request<User[]>(`/${id}`);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.request<User>(`/search?email=${email}`);
  }

  join(email: string, town: string): Promise<{ userTownId: number }> {
    const option: RequestInit = {
      method: 'post',
      body: JSON.stringify({ email, town }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.request<{ userTownId: number }>('', option);
  }

  getSession(): Promise<User[]> {
    return this.request<User[]>(`/session`);
  }
}

export class WishApi extends Api {
  constructor() {
    super('/api/v0/wishes');
  }

  getWishesByUserId(userId: number): Promise<Wish[]> {
    return this.request<Wish[]>(`/${userId}`);
  }

  toggleWish(userId: number, productId: number): Promise<void> {
    const option: RequestInit = {
      method: 'put',
      body: JSON.stringify({ userId, productId }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.request<void>('', option);
  }
}

export class ChatRoomApi extends Api {
  constructor() {
    super('/api/v0/chat-rooms');
  }

  getChatRoomByProductId(productId: number): Promise<ChatRoom[]> {
    return this.request<ChatRoom[]>(`/${productId}`);
  }
}

export class TownApi extends Api {
  constructor() {
    super('/api/v0/town');
  }

  getTownsByUserId(id: number): Promise<Town[]> {
    return this.request<Town[]>(`?userId=${id}`);
  }

  getOrAddTown(name: string): Promise<Town> {
    return this.request<Town>(`/search?name=${name}`);
  }

  addUserTown(userId: number, townName: string): Promise<{ result: boolean; town: Town }> {
    const option: RequestInit = {
      method: 'post',
      body: JSON.stringify({ userId, townName }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.request<{ result: boolean; town: Town }>('/', option);
  }

  deleteUserTown(userId: number, townId: number): Promise<{ result: boolean }> {
    const option: RequestInit = {
      method: 'delete',
      body: JSON.stringify({ townId, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.request<{ result: boolean }>(`/${townId}`, option);
  }
}
