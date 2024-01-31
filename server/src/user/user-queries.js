import { User } from './user-model.js';

const getAllUser = async () => {
  const users = await User.find({});
  return users;
}

const createUser = async (payload) => {
  const user = await User.create(payload);
  return user;
}

export {
  getAllUser,
  createUser
}