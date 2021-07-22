import { Product, Picture, ChatRoom, Wish, User } from '../../types';
import qs from 'querystring';
import { Session } from 'express-session';

const BASE_URL: string = process.env.API_URL ?? 'http://localhost:8000';

export class Api {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  request<AjaxResponse>(path: string, OPTION?: RequestInit | undefined): Promise<AjaxResponse> {
    return fetch(`${BASE_URL}${this.basePath}${path}`, { ...OPTION, credentials: 'include' }).then((response) =>
      response.json()
    );
  }
}

export class SessionApi extends Api {
  constructor() {
    super('/session');
  }

  getSession(): any {
    return this.request<any>('').then((response) => {
      console.log(response);
      return response.json();
    });
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
