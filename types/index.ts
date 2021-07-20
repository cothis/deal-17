import { RowDataPacket } from 'mysql2';
import View from '../frontend/core/view';

export interface UserStore {
  user: User | null;
  auth: string;
}

export interface ProductStore {
  getAllProducts: () => Product[];
  getProduct: (id: number) => Product | undefined;
  currentPage: number;
}

export interface User {
  readonly id: number;
  readonly email: string;
}

export interface Category {
  readonly id: number;
  readonly name: string;
  readonly imagePath: string;
}

export interface Product extends RowDataPacket {
  readonly id: number;
  subject: string;
  categoryId: number;
  price?: number;
  content?: string;
  readonly sellerId: number;
  state: number;
  views: number;
  readonly createdAt: Date;

  // db 외 정보
  pictures: Picture[];
  userWish: boolean;
  wishes: number;
  chatRooms: number;
}

export interface ChatRoom extends RowDataPacket {
  readonly id: number;
  readonly productId: number;
  readonly sellerId: number;
  readonly customerId: number;
}

export interface Town {
  readonly id: number;
  readonly name: string;
}

export interface UserTown {
  readonly id: number;
  readonly userId: number;
  readonly townId: number;
}

export interface Picture {
  readonly id: number;
  readonly path: string;
  readonly productId: number;
}

export interface Wish {
  readonly id: number;
  readonly userId: number;
  readonly productId: number;
  isChecked: boolean;
}

export interface Message {
  readonly id: number;
  readonly chatRoomId: number;
  readonly userId: number;
  readonly content: string;
  isRead: boolean;
  readonly createdAt: Date;
}

export interface RouteInfo {
  path: string;
  page: View;
}

export enum AnimateType {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  FADE = 'fade',
}
