import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Product } from '../../types';
import { OkPacket, RowDataPacket } from 'mysql2';

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await promisePool.query<Product[]>(`select * from PRODUCT order by ID`);

  return rows;
};

export const getProductById = async (req: Request): Promise<Product> => {
  const productId: number = Number(req.params.id);
  const [rows] = await promisePool.query<Product[]>(`select * from PRODUCT where ID = ${productId}`);

  return rows[0];
};

export const createProduct = (body: {
  subject: string;
  price: number;
  categoryId: number;
  content: string;
  sellerId: number;
}): Promise<number> => {
  const { subject, price, categoryId, content, sellerId } = body;
  return promisePool
    .query<OkPacket>('insert into PRODUCT(subject, category_id, price, content, seller_id) values(?, ?, ?, ?, ?)', [
      subject,
      categoryId,
      price,
      content,
      sellerId,
    ])
    .then((res) => res[0])
    .then((result) => result.insertId)
    .catch((err) => {
      console.error(err);
      throw new Error('상품 등록 실패');
    });
};
