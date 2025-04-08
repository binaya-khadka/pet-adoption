import bcrypt from 'bcryptjs';

import { jwtUtils } from '../utils';
import { userRepository } from '.';
import { User } from 'src/types';

export async function getUserByEmail(email: string) {
  return await userRepository.fetchUserByEmail(email);
}

export async function getAllUser() {
  return await userRepository.fetchAllUsers();
}

export async function register(
  payload: Omit<User, '_id' | 'createdAt' | 'isAdmin'>
) {
  const user = await userRepository.createUser(payload);

  const userdata = {
    id: user._id,
    name: user.name,
    email: user.email
  };

  const token = jwtUtils.generateToken(user._id);

  return { user: userdata, token };
}

export async function login({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  const user = await userRepository.fetchUserByEmail(email);

  if (!user) {
    throw { message: 'User not found' };
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw {
      message: 'Invalid Credentials'
    };
  }

  const token = jwtUtils.generateToken(user._id);
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email
  };

  return { user: userData, token };
}
