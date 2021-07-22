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

export interface Town extends RowDataPacket {
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

export const CATEGORIES = [
  { id: 1, name: '디지털기기', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/digital.png' },
  { id: 2, name: '생활가전', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/life.png' },
  { id: 3, name: '가구/인테리어', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/furniture.png' },
  { id: 4, name: '게임/취미', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/game.png' },
  { id: 5, name: '생활/가공식품', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/food.png' },
  { id: 6, name: '스포츠/레저', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/sport.png' },
  { id: 7, name: '여성패션/잡화', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/skirt.png' },
  { id: 8, name: '남성패션/잡화', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/clothe.png' },
  { id: 9, name: '유아동', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/kids.png' },
  { id: 10, name: '뷰티/미용', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/veauti.png' },
  { id: 11, name: '반려동물', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/pet.png' },
  { id: 12, name: '도서/티켓/음반', image: 'https://deal-17.s3.ap-northeast-2.amazonaws.com/categories/book.png' },
];
