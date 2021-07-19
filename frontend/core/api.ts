import { Product, Picture, ChatRoom, Wish, User } from '../../types';

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

  getProductById(id: number): Promise<Product> {
    return this.get<Product>(`/${id}`);
  }
}

export class PictureApi extends Api {
  constructor() {
    super('/api/v0/pictures');
  }

  getPicturesByProductId(productId: number): Promise<Picture[]> {
    return this.get<Picture[]>(`/${productId}`);
  }
}

export class UserApi extends Api {
  constructor() {
    super('/api/v0/users');
  }

  getUserById(id: number): Promise<User[]> {
    return this.get<User[]>(`/${id}`);
  }
}

export class WishApi extends Api {
  constructor() {
    super('/api/v0/wishes');
  }

  getWishesByUserId(userId: number): Promise<Wish[]> {
    return this.get<Wish[]>(`/${userId}`);
  }
}

export class ChatRoomApi extends Api {
  constructor() {
    super('/api/v0/chat-rooms');
  }

  getChatRoomByProductId(productId: number): Promise<ChatRoom[]> {
    return this.get<ChatRoom[]>(`/${productId}`);
  }
}
