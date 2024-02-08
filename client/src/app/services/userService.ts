import { MutationFunction } from "react-query";
import { User, ISignup, ILogin } from "../../interfaces";
import { API } from "../lib";

const signUpUser: MutationFunction<{
  message: string;
  data: User & { token: string }
}, ISignup> = async data => {
  return await API.post('/user', data)
}

const loginUser: MutationFunction<{
  message: string;
  data: User & { token: string }
}, ILogin> = async data => {
  return await API.post('/user/login', data)
}

export { signUpUser, loginUser }