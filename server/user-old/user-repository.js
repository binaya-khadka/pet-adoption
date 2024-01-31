import { User } from './user-model.js';

const fetchAllUser = async () => {
  return await User.find({});
}

const createUser = async (payload) => {
  return await User.create(payload);
}

const updateUser = async (payload) => {
  const { id, ...rest } = payload;
  return await User.findByIdAndUpdate(id, { ...rest }, { new: true });
}

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
}

export {
  fetchAllUser,
  createUser,
  updateUser,
  deleteUser
}