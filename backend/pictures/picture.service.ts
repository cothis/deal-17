import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Picture } from '../../types';
import { OkPacket } from 'mysql2';

export const getPicturesByProductId = async (req: Request): Promise<Picture[]> => {
  const productId: number = Number(req.params.productId);
  const [rows] = await promisePool.query(`select * from PICTURE where PRODUCT_ID = ${productId} order by ID`);

  return <Picture[]>camelCase(rows);
};

export const createPictures = (req: Express.Request, productId: number): Promise<number> => {
  const promises = (<Express.MulterS3.File[]>req.files)?.map<Promise<any>>((file: Express.MulterS3.File) => {
    return promisePool.query<OkPacket>('insert into picture(path, product_id) values(?, ?)', [
      file.location,
      productId,
    ]);
  });

  return Promise.all(promises)
    .then((res) => res[0])
    .then((result) => result.insertId)
    .catch((error) => {
      console.error(error);
      throw new Error('Picture 테이블 저장 실패');
    });
};
