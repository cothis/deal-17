import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { User } from '../../types';

const QUERY_RESULT_ROWS = 0;

export const getUserById = (id: number): Promise<User | null> => {
  return promisePool
    .query(`select * from USER where ID = ${id}`)
    .then((result) => (result[QUERY_RESULT_ROWS] as User[])[0]);
};
