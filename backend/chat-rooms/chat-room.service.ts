import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { ChatRoom } from '../../types';

const QUERY_RESULT_ROWS = 0;

export const getChatRoomsByProductId = (productId: number): Promise<ChatRoom[] | null> => {
  return promisePool
    .query(`select * from CHAT_ROOM where PRODUCT_ID = ${productId}`)
    .then((result) => result[QUERY_RESULT_ROWS] as ChatRoom[]);
};

export const getChatRoomById = (id: number): Promise<ChatRoom> => {
  return promisePool
    .query(`select * from CHAT_ROOM where ID = ${id}`)
    .then((result) => (result[QUERY_RESULT_ROWS] as ChatRoom[])[0]);
};
