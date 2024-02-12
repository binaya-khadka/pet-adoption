import { getItemFromLocalStorage } from "../lib/localStorage";


export default function getCurrentUser() {
  return JSON.parse(getItemFromLocalStorage(user) || "{}")
}