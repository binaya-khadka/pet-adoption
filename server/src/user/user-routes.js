import express from 'express'
import { apiMethodUtils } from '../utils/index.js';
import { User } from './index.js'
import db from '../lib/db.js'
import { hashPassword } from './user-handler.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    db();
    const users = await User.getAllUser();
    return apiMethodUtils.apiSuccess({ req, res, data: users, message: "Data Fetched Successfully" })
  } catch (error) {
    console.log(error)
    return apiMethodUtils.apiFail({ req, res, error: error, message: 'Something went wrong' })
  }
});

router.post('/', async (req, res) => {
  try {
    db();
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const payload = { name, email, password: hashedPassword };
    // 
    const user = await User.createUser(payload);
    return apiMethodUtils.apiSuccess({ req, res, data: user, message: "Successfully created User" })
  } catch (error) {
    console.log(error)
    return apiMethodUtils.apiFail({ req, res, error: error, message: 'Something went wrong' })
  }
})

export { router }