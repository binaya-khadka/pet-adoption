import express, { Request, Response } from 'express'
import config from './config';
// import { userRouter } from './user/index.js'
// import { petRouter } from './pet/index.js';
import cors from 'cors'
import { connectDB } from './lib';

const app = express();
app.use(cors());

const port = config?.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// app.use('/user', userRouter);
// app.use('/pet', petRouter);

app.listen(port, () => {
  connectDB().then(() => {
    console.log('Connected to MongoDB');
  });
  console.log(`Server has started at http://localhost:${port}`)
})