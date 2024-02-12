import { storageConstants } from "../../constants";
import { getItemFromLocalStorage } from "../lib/localStorage";

const getCurrentUser = () => {
  return JSON.parse(getItemFromLocalStorage(storageConstants.localUserKey) || '{}')
}

export { getCurrentUser }
