import { Request, Response } from 'express';
import { promisePool } from '../db';
import { camelCase } from 'change-case-object';
import { Wish } from '../../types';

const QUERY_RESULT_ROWS = 0;

export const getWishesByUserId = (userId: number): Promise<Wish | null> => {
  return promisePool
    .query(`select * from WISH where USER_ID = ${userId}`)
    .then((result) => (result[QUERY_RESULT_ROWS] as Wish[])[0]);
};
