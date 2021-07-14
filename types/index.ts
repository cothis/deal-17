import View from '../frontend/core/view'

export interface Usesr {
    id: number;
    email: string;
}

export interface Category {
    id: number;
    name: string;
    imagePath: string;
}

export interface Product {
    id: number;
    subject: string;
    categoryId: number;
    price: number | null;
    content: string | null;
    sellerId: number;
    state: number;
    views: number;
    createdAt: Date;
}

export interface ChatRoom {
    id: number;
    productId: number;
    sellerId: number;
    customerId: number
}

export interface Town {
    id: number;
    name: string;
}

export interface UserTown {
    id: number;
    userId: number;
    townId: number;
}

export interface Picture {
    id: number;
    path: string;
    productId: number;
}

export interface Wish {
    id: number;
    userId: number;
    productId: number;
    isChecked: boolean;
}

export interface Message {
    id: number;
    chatRoomId: number;
    userId: number;
    content: string;
    isRead: boolean;
    createdAt: Date;
}

export interface RouteInfo {
    path: string;
    page: View;
}