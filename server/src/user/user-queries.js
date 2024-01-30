import { User } from "./user-schema.js";

const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return error;
  }
}

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return error;
  }
}

const createUser = async (payload) => {
  try {
    const user = await User.create(payload);
    return user;
  } catch (error) {
    return error;
  }
}

export {
  getUser,
  getAllUsers,
  createUser
}