import { camelCase } from 'change-case-object';
import { OkPacket } from 'mysql2';
import { Town, UserTown } from '../../types';
import { promisePool } from '../db';

export const getTownsByUserId = (userId: number): Promise<Town[]> => {
  return promisePool
    .query<Town[]>(
      `select name from town 
    inner join user_town on town.id = user_town.town_id 
    where user_id = ?`,
      userId
    )
    .then((res) => <Town[]>camelCase(res[0]));
};

export const addUserTown = (userId: number, townId: number): Promise<number> => {
  console.log(userId, townId);
  return promisePool
    .query<OkPacket>('insert into user_town(user_id, town_id) values (?, ?)', [userId, townId])
    .then((res) => res[0])
    .then((result) => result.insertId)
    .catch((err) => {
      console.error(err);
      throw new Error('중복된 이름입니다.');
    });
};

export const getTownById = (id: number): Promise<Town> => {
  return promisePool.query<Town[]>('select * from town where id = ?', [id]).then((res) => <Town>camelCase(res[0][0]));
};
