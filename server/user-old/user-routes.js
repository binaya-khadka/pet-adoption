import express from 'express'
import { apiMethodUtils } from '../utils/index.js';
import { User } from './index.js'
import db from '../lib/db.js'
import { hashPassword } from './user-handler.js';
import * as userService from './user-service.js'

const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     db();
//     const users = await User.fetchAllUser();
//     return apiMethodUtils.apiSuccess({ req, res, data: users, message: "Data Fetched Successfully" })
//   } catch (error) {
//     console.log(error)
//     return apiMethodUtils.apiFail({ req, res, error: error, message: 'Something went wrong' })
//   }
// });
router.get('/', async (req, res) => {
  try {

  } catch (err) {
    console.log(err)
    apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong'})
  }
})

router.post('/', async (req, res) => {
  try {
    db();
    const {name, email, password} = req.body;
    const user = await userService.register(name, email, password);
    return apiMethodUtils.apiSuccess({ req, res, data: user, message: "Successfully created User" })
  } catch (error) {
    console.log(error)
    return apiMethodUtils.apiFail({ req, res, error: error, message: 'Something went wrong' })
  }
})

export { router }