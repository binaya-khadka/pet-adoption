import express, { Request, Response } from 'express';
import { userRouter } from './user';
import cors from 'cors';
import { connectDB, serverConfig } from './lib';

const app = express();
app.use(cors());

const port = serverConfig?.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'ping'
  });
});

app.use('/user', userRouter);
// app.use('/pet', petRouter);

app.listen(port, () => {
  connectDB().then(() => {
    console.log('Connected to MongoDB');
  });
  console.log(`Server has started at http://localhost:${port}`);
});
