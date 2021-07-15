import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Product } from '../../types';

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await promisePool.query(`select * from PRODUCT order by ID`);

  return <Product[]>camelCase(rows);
};
