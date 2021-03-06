import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { User } from '../../types';
import { OkPacket } from 'mysql2';

const QUERY_RESULT_ROWS = 0;

export const getUserById = (id: number): Promise<User | null> => {
  return promisePool
    .query(`select * from USER where ID = ${id}`)
    .then((result) => (result[QUERY_RESULT_ROWS] as User[])[0]);
};

export const join = (email: string): Promise<number> => {
  return promisePool
    .query<OkPacket>('insert into USER(email) values (?)', [email])
    .then((res) => res[0])
    .then((result) => result.insertId)
    .catch((err) => {
      throw new Error('아이디 중복이 발생했습니다.');
    });
};

export const getUserByEmail = (email: string): Promise<User> => {
  return promisePool
    .query('select * from user where email = ?', [email])
    .then((res) => {
      const user = (<User[]>res[0])[0];
      if (user) return <User>camelCase(user);
      else throw Error;
    })
    .catch((err) => {
      throw new Error('아이디가 없습니다');
    });
};
