import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Picture } from '../../types';

export const getPicturesById = async (req: Request): Promise<Picture[]> => {
  const productId: number = Number(req.params.id);
  const [rows] = await promisePool.query(`select * from PICTURE where PRODUCT_ID = ${productId} order by ID`);

  return <Picture[]>camelCase(rows);
};
