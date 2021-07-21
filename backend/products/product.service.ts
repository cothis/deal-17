import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Product, QUERY_RESULT_ROWS } from '../../types';
import { RowDataPacket } from 'mysql2';
import { ResolvePlugin } from 'webpack';

interface ProductMap {
  [key: string]: Product;
}

const injectProductDetail = (products: Product[], userId: number) => {
  const productIds = products.map((product) => product.id);
  let sellerIds = products.map((product) => product.sellerId);
  sellerIds = sellerIds.filter((sellerId, pos) => sellerIds.indexOf(sellerId) === pos);

  return Promise.all([
    // picture 이미지 | PRODUCT_ID
    promisePool.query(`select * from PICTURE where PRODUCT_ID in(${productIds.join(', ')})`),

    // 로그인한 유저가 wish 눌럿는지 | USER_ID
    promisePool.query(`select * from WISH where USER_ID = ? and PRODUCT_ID in(${productIds.join(', ')})`, [userId]),

    // seller -> user-town, town 판매자 동네 이름 | USER_ID와 TOWN_ID, ID
    promisePool.query(`
    select t.NAME as TOWN_NAME, ut.USER_ID
    from TOWN t
    left join USER_TOWN ut
    on ut.TOWN_ID = t.ID
    where ut.USER_ID in(${sellerIds.join(', ')})`),

    // chatRoom , product id로 count | PRODUCT_ID
    promisePool.query(`
    select PRODUCT_ID, count(*) CHAT_ROOM_COUNT
    from CHAT_ROOM 
    where PRODUCT_ID in(${productIds.join(', ')})
    group by PRODUCT_ID`),

    // wish, product id로 count | PRODUCT_ID
    promisePool.query(`
    select PRODUCT_ID, count(*) WISH_COUNT
    from WISH 
    where PRODUCT_ID in(${productIds.join(', ')})
    group by PRODUCT_ID`),
  ]).then(([resultPicture, resultWish, resultTownName, resultChatRoomCount, resultWishCount]) => {
    const pictures = camelCase(resultPicture[QUERY_RESULT_ROWS]) as any[];
    const wishes = camelCase(resultWish[QUERY_RESULT_ROWS]) as any[];
    const towns = camelCase(resultTownName[QUERY_RESULT_ROWS]) as any[];
    const chatRoomCounts = camelCase(resultChatRoomCount[QUERY_RESULT_ROWS]) as any[];
    const wishCounts = camelCase(resultWishCount[QUERY_RESULT_ROWS]) as any[];

    products.forEach((product) => {
      product.pictures = [];
      product.userWish = false;
      product.townName = '';
      product.chatRooms = 0;
      product.wishes = 0;
    });

    const productIdMap = products.reduce(
      (obj, product) => Object.assign(obj, { [product.id]: product }),
      {}
    ) as ProductMap;
    const sellerIdMap = products.reduce(
      (obj, product) => Object.assign(obj, { [product.sellerId]: product }),
      {}
    ) as ProductMap;

    pictures.forEach((picture) => {
      const product = productIdMap[picture.productId];
      product.pictures.push(picture);
    });

    wishes.forEach((wish) => {
      const product = productIdMap[wish.productId];
      product.userWish = wish.isChecked === 1;
    });

    towns.forEach((town) => {
      const product = sellerIdMap[town.userId];
      product.townName = town.name;
    });

    chatRoomCounts.forEach((chatRoomCount) => {
      const product = productIdMap[chatRoomCount.productId];
      product.chatRooms = chatRoomCount.chatRoomCount;
    });

    wishCounts.forEach((wishCount) => {
      const product = productIdMap[wishCount.productId];
      product.wishes = wishCount.wishCount;
    });

    return products;
  });
};

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
  categoryId,
  page,
  pageSize,
}: {
  userId: number;
  categoryId: number;
  page: number;
  pageSize: number;
}) => {
  const categoryIdParam = categoryId || null;
  const pageParam = page || 1;
  const pageSizeParam = pageSize || 10;

  return promisePool
    .query(`select * from PRODUCT where CATEGORY_ID = ifnull(?, CATEGORY_ID) order by ID desc limit ? offset ?`, [
      categoryIdParam,
      pageSizeParam,
      (pageParam - 1) * pageSizeParam,
    ])
    .then((result) => {
      const products = camelCase(result[QUERY_RESULT_ROWS]) as Product[];
      return injectProductDetail(products, userId);
    })
    .then((products: Product[]) => {
      return products;
    });
};

export const getProductDetail = ({ userId, productId }: { userId: number; productId: number }) => {
  return promisePool
    .query(`select * from PRODUCT where ID = ?`, [productId])
    .then((result) => {
      const products = camelCase(result[QUERY_RESULT_ROWS]) as Product[];
      return injectProductDetail(products, userId);
    })
    .then((products: Product[]) => {
      console.log(products[0]);
      return products[0];
    });
};

export const increaseViewCount = (id: number) => {
  return promisePool.query(`update PRODUCT set VIEWS = VIEWS + 1 where ID = ?`, [id]).then(() => {});
};

export const updateProductState = (id: number, state: number) => {
  return promisePool.query(`update PRODUCT set STATE = ? where ID = ?`, [state, id]).then(() => {});
};
