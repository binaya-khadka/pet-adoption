import * as userRepository from './user-repository.js'
import bcrypt from 'bcryptjs'

export async function register() {
  const { name, email, password } = payload;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const payload = { name, email, password: hashedPassword }

  const user = await userRepository.createUser({ name, email, password })

  return user;
}

export async function login(payload) {
  const { email, password } = payload;

  const user = await userRepository.findUserByEmail(email);

  if (!user) throw new Error('User not found');

  if(!bcrypt.compare(password, user.password)) throw new Error('Invalid credentials');

  return user;
}

export async function getUserById(id) {
  const user = await userRepository.findUserById(id);

  if (!user) throw new Error('User not found');

  return user;
}

export async function getUsers() {
  const users = await userRepository.fetchAllUser();

  return users;
}