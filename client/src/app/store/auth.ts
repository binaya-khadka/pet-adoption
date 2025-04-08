import { storageConstants } from '@/constants';
import { getItemFromLocalStorage } from '@/app/lib/localStorage';

const getCurrentUser = () => {
  return JSON.parse(
    getItemFromLocalStorage(storageConstants.localUserKey) || '{}'
  );
};

export { getCurrentUser };
