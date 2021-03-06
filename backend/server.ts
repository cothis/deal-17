import * as http from 'http';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import 'dotenv-defaults/config';
import ProductController from './products/product.controller';
import PictureController from './pictures/picture.controller';
import UserController from './users/user.controller';
import WishController from './wishes/wish.controller';
import ChatRoomController from './chat-rooms/chat-room.controller';
import TownController from './town/town.controller';
import * as path from 'path';
import { User } from '../types';

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

const app = express();
const server: http.Server = http.createServer(app);

app.set('port', process.env.PORT || 8000);
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
app.get('/session', (req, res) => {
  res.json(req.session.user);
});
app.use('/api/v0/products', ProductController);
app.use('/api/v0/pictures', PictureController);
app.use('/api/v0/users', UserController);
app.use('/api/v0/wishes', WishController);
app.use('/api/v0/chat-rooms', ChatRoomController);
app.use('/api/v0/town', TownController);

server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
