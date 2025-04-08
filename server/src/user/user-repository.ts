import { User } from 'src/types';
import { Users } from '.';

const fetchAllUsers = async () => {
  return await Users.find();
};

const fetchUserByEmail = async (email: string) => {
  return await Users.findOne({ email: email });
};

const fetchUserById = async (id: string) => {
  return await Users.findById(id);
};

const createUser = async (
  payload: Omit<User, '_id' | 'createdAt' | 'isAdmin'>
): Promise<User> => {
  return await Users.create(payload);
};

const updateUser = async (payload: any) => {
  const { id, ...rest } = payload;
  return await Users.findByIdAndUpdate(id, { ...rest }, { new: true });
};

const deleteUser = async (id: string) => {
  return await Users.findByIdAndDelete(id);
};

export {
  fetchAllUsers,
  fetchUserByEmail,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser
};
