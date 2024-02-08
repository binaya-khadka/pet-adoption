import { MutationFunction } from "react-query";
import { User, ISignup } from "../../interfaces";
import { API } from "../lib";

const signUpUser: MutationFunction<{
  message: string;
  data: User & { token: string }
}, ISignup> = async data => {
  return await API.post('/user', data)
}

export { signUpUser }