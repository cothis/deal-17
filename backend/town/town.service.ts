import { OkPacket } from 'mysql2';
import { Town } from '../../types';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';

export const getTowns = (): Promise<Town[]> => {
  return promisePool.query(`select * from town`).then((res) => <Town[]>res[0]);
};

export const addTown = (name: string): Promise<number> => {
  return promisePool
    .query<OkPacket>('insert into town(name) values (?)', [name])
    .then((res) => res[0])
    .then((result) => result.insertId)
    .catch((err) => {
      throw new Error('중복된 이름입니다.');
    });
};

export const getOrAddTown = (name: string): Promise<Town> => {
  return promisePool.query('select * from town where name = ?', [name]).then((res) => {
    const town: Town = (<Town[]>res[0])[0];
    if (town) {
      return <Town>camelCase(town);
    } else {
      return promisePool
        .query<OkPacket>('insert into town(name) values (?)', [name])
        .then((res) => res[0])
        .then((result) => {
          return {
            id: result.insertId,
            name,
          } as Town;
        });
    }
  });
};

export const getTownById = (id: number): Promise<Town> => {
  return promisePool.query('select * from town where id = ?', [id]).then((res) => <Town>camelCase((<Town[]>res[0])[0]));
};
