import { camelCase } from 'change-case-object';
import { OkPacket } from 'mysql2';
import { Town, UserTown } from '../../types';
import { promisePool } from '../db';

export const getTownsByUserId = (userId: number): Promise<Town[]> => {
  return promisePool
    .query(
      `select t.id as id, t.name as name, ut.active as is_active from town t 
    inner join user_town ut on t.id = ut.town_id 
    where user_id = ?`,
      userId
    )
    .then((res) => <Town[]>camelCase(res[0]));
};

export const addUserTown = (userId: number, townId: number, active: number): Promise<number> => {
  return promisePool
    .query<OkPacket>('insert into user_town(user_id, town_id, active) values (?, ?, ?)', [userId, townId, active])
    .then((res) => res[0])
    .then((result) => result.insertId)
    .catch((err) => {
      console.error(err);
      throw new Error('중복된 이름입니다.');
    });
};

export const setActiveTownByEachId = (userId: number, townId: number, active: number): Promise<boolean> => {
  return promisePool
    .query<OkPacket>('update user_town set active = ? where user_id = ? and town_id = ?', [active, userId, townId])
    .then((res) => res[0])
    .then((result) => true)
    .catch((err) => {
      console.error(err);
      throw new Error('동네 상태 변경에 실패했습니다.');
    });
};

export const setActiveTown = (userTownId: number, active: number): Promise<number> => {
  return promisePool
    .query<OkPacket>('update user_town set active = ? where id = ?', [active, userTownId])
    .then((res) => res[0])
    .then((result) => userTownId)
    .catch((err) => {
      console.error(err);
      throw new Error('동네 상태 변경에 실패했습니다.');
    });
};

export const getTownById = (id: number): Promise<Town> => {
  return promisePool.query('select * from town where id = ?', [id]).then((res) => <Town>camelCase((<Town[]>res[0])[0]));
};

export const deleteUserTown = (userId: number, townId: number): Promise<boolean> => {
  return promisePool
    .query<OkPacket>('delete from user_town where user_id = ? and town_id = ?', [userId, townId])
    .then((res) => res[0])
    .then((result) => true)
    .catch((err) => {
      console.error(err);
      throw new Error('삭제에 실패했습니다.');
    });
};
