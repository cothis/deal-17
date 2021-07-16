import mysql from 'mysql2';
import 'dotenv-defaults/config';

const DB_INFO = JSON.parse(process.env.DB_INFO!);
const pool = mysql.createPool(DB_INFO);

export const promisePool = pool.promise();