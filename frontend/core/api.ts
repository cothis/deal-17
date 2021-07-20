import { Product, Picture, ChatRoom, Wish, User } from '../../types';

const BASE_URL: string = process.env.API_URL ?? 'http://localhost:8000';

export class Api {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  request<AjaxResponse>(path: string, OPTION?: RequestInit | undefined): Promise<AjaxResponse> {
    return fetch(`${BASE_URL}${this.basePath}${path}`, OPTION).then((response) => response.json());
  }
}

export class ProductApi extends Api {
  constructor() {
    super('/api/v0/products');
  }

  getAllProducts(): Promise<Product[]> {
    return this.request<Product[]>('');
  }

  getProductById(id: number): Promise<Product> {
    return this.request<Product>(`/${id}`);
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
}

export class WishApi extends Api {
  constructor() {
    super('/api/v0/wishes');
  }

  getWishesByUserId(userId: number): Promise<Wish[]> {
    return this.request<Wish[]>(`/${userId}`);
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
