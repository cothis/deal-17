import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Product } from '../../types';
import { RowDataPacket } from 'mysql2';

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await promisePool.query<Product[]>(`select * from PRODUCT order by ID`);

  return rows;
};

export const getProductById = async (req: Request): Promise<Product> => {
  const productId: number = Number(req.params.id);
  const [rows] = await promisePool.query<Product[]>(`select * from PRODUCT where ID = ${productId}`)

  return rows[0];
};
