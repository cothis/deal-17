import * as http from 'http';
import express from 'express';
import cors from 'cors';
import { promisePool } from './db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server: http.Server = http.createServer(app);

app.set('port', process.env.PORT || 8000);
app.use(express.json());

app.use(cors());

const test = async () => {
  const [rows, fields] = await promisePool.query('select * from test');
  console.log(rows);
};

app.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send('{"name": "test"}');
});

server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

test();
