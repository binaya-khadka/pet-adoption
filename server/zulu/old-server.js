import { apiMethodUtils } from './utils/index.js';


import express from 'express'
import config from './config.js';



import { User } from './user/index.js';

import { petQuery } from './pet/index.js';

import db from './lib/db.js'

const app = express()

app.use(express.json());

// app.get('/users', async (req, res) => {
//   try {
//     db();
//     const users = await User.getAllUsers();
//     res.send({ message: "users fetched successfully", data: users })
//   } catch (error) {
//     res.send({
//       message: "Something unexpected happen", status: {
//         success: false,
//         code: 400
//       },
//       error: error
//     })
//   }
// })

// app.post('/users', async (req, res) => {
//   try {
//     db();
//     const user = await User.createUser(req?.body);
//     res.send({ message: "User has been created successfully", data: user })
//   } catch (error) {
//     console.log(error)
//     res.send({
//       message: "Something unexpected happen", status: {
//         success: false,
//         code: 404
//       }
//     })
//   }
// })

app.get('/pets', async (req, res) => {
  try {
    const pets = await petQuery.fetchAllPets();
    console.log(pets);
    res.send({ message: "pets fetched successfully", data: pets })
  } catch (error) {
    console.log(error)
    res.send({
      message: "Something unexpected happen", status: {
        success: false,
        code: 400
      }
    })
  }
})

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`)
})