import { MutationFunction } from "react-query";
import { ISignup } from "../../interfaces/auth";
// import axios from 'axios'
import { API } from "../lib";

const signUpUser: MutationFunction<{
  message: string;
}, ISignup> = async data => {
  return await API.post('/user', data)
}

export { signUpUser }