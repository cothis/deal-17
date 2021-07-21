import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Product, QUERY_RESULT_ROWS } from '../../types';
import { RowDataPacket } from 'mysql2';
import { ResolvePlugin } from 'webpack';

export const getAllProducts = (): Promise<Product[]> => {
  return promisePool
    .query(`select * from PRODUCT order by ID`)
    .then((result) => camelCase(result[QUERY_RESULT_ROWS]) as Product[]);
};

export const getProductById = (id: number): Promise<Product> => {
  return promisePool
    .query(`select * from PRODUCT where ID = ?`, id)
    .then((result) => (camelCase(result[QUERY_RESULT_ROWS]) as Product[])[0]);
};

export const getMainProducts = ({
  userId,
  wishId,
  townId,
  chatRoomId,
  categoryId,
  page,
  pageSize,
}: {
  userId: number;
  wishId: number;
  townId: number;
  chatRoomId: number;
  categoryId: number;
  page: number;
  pageSize: number;
}) => {
  const categoryIdParam = categoryId || null;
  const pageParam = page || 1;
  const pageSizeParam = pageSize || 10;

  return promisePool
    .query(`select * from PRODUCT where CATEGORY_ID = IFNULL(?, CATEGORY_ID) order by ID desc LIMIT ? OFFSET ?`, [
      categoryIdParam,
      pageSizeParam,
      (pageParam - 1) * pageSizeParam,
    ])
    .then((result) => {
      const products = camelCase(result[QUERY_RESULT_ROWS]) as Product[];
      const productIds = products.map((product) => product.id);
      const sellerIds = products.map((product) => product.sellerId);

      console.log(productIds, sellerIds);
      return products;

      // picture 이미지 | PRODUCT_ID

      // 로그인한 유저가 wish 눌럿는지 | USER_ID
      // seller -> user-town, town 판매자 동네 이름 | USER_ID와 TOWN_ID, ID
      // chatRoom , product id로 count | PRODUCT_ID
      // wish, product id로 count | PRODUCT_ID
      promisePool.query;
    })
    .then((products: Product[]) => {
      console.log(products);
      return products;
    });
};
