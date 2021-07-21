import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Product, QUERY_RESULT_ROWS } from '../../types';
import { RowDataPacket } from 'mysql2';

export const getAllProducts = (): Promise<Product[]> => {
  return promisePool.query(`select * from PRODUCT order by ID`).then((result) => (result[QUERY_RESULT_ROWS] as Product[]));
};

export const getProductById = (id: number): Promise<Product> => {
  return promisePool
    .query(`select * from PRODUCT where ID = ?`, id)
    .then((result) => (result[QUERY_RESULT_ROWS] as Product[])[0]);
};

// export const  getMainProducts = asnyc ()


// export const getChatRoomById = (id: number): Promise<ChatRoom> => {
//   return promisePool
//     .query(`select * from CHAT_ROOM where ID = ${id}`)
//     .then((result) => (result[QUERY_RESULT_ROWS] as ChatRoom[])[0]);
// };
