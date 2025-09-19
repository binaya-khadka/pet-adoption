import express, { Request, Response } from 'express';
import { userRouter } from './user';
import cors from 'cors';
import { connectDB, serverConfig } from './lib';
import { petRouter } from './pet';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
app.use(cors());

const port = serverConfig?.port;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('go-online', (userId: string) => {
    console.log('USER ONLINE', userId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'ping'
  });
});

app.use('/user', userRouter);
app.use('/pet', petRouter);

server.listen(port, () => {
  connectDB().then(() => {
    console.log('Connected to MongoDB');
  });
  console.log(`Server has started at http://localhost:${port}`);
});
