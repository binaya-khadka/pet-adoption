import { User } from './user-model.js';

const fetchAllUser = async () => {
  return await User.find({});
}

const fetchUserByEmail = async (email) => {
  return await User.findOne({ email: email })
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
  fetchUserByEmail,
  createUser,
  updateUser,
  deleteUser,
}