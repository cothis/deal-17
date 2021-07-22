import * as http from 'http';
import express from 'express';
import cors from 'cors';
import 'dotenv-defaults/config';
import ProductController from './products/product.controller';
import PictureController from './pictures/picture.controller';
import UserController from './users/user.controller';
import WishController from './wishes/wish.controller';
import ChatRoomController from './chat-rooms/chat-room.controller';
import * as path from 'path';
import session from 'express-session';
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
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
  })
);
app.use(express.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
app.get('/session', (req, res) => res.json(req.session));
app.use('/api/v0/products', ProductController);
app.use('/api/v0/pictures', PictureController);
app.use('/api/v0/users', UserController);
app.use('/api/v0/wishes', WishController);
app.use('/api/v0/chat-rooms', ChatRoomController);

server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
