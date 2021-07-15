import * as http from 'http';
import express from 'express';
import cors from 'cors';
import 'dotenv-defaults/config';
import ProductController from './products/product.controller';

const app = express();
const server: http.Server = http.createServer(app);

app.set('port', process.env.PORT || 8000);
app.use(express.json());

app.use(cors());

app.use('/api/v0/products', ProductController);

server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
