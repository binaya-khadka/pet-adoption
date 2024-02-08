import * as userRepository from './user-repository.js'
import bcrypt from 'bcryptjs'
import { jwtUtils } from '../utils/index.js';

export async function getAllUser() {
  return await userRepository.fetchAllUser({});
}

export async function register(payload) {
  const user = await userRepository.createUser(payload);
  const token = jwtUtils.generateToken(user._id);

  return { user, token };
}

export async function login({ email, password }) {
  const user = await userRepository.fetchUserByEmail(email);

  if (!user) {
    throw { message: 'User not found' }
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw {
      message: "Invalid Credentials",
    }
  }

  const token = jwtUtils.generateToken(user._id);

  return { user, token };
}