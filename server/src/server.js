import express from 'express'
import config from './config.js';
import { USER } from './user/index.js'
import { PET } from './pet/index.js';

const app = express();

const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', USER);

app.use('/pet', PET);

app.listen(port, () => {
  console.log(`Server has started at http://localhost:${port}`)
})