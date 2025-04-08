import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store';
import { User } from '../../../interfaces';
import { localStorageUtils } from '../../utils';
import { storageConstants } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export default function useNav() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [userFetched, setUserFetched] = useState<boolean>(false);

  const logoutUser = () => {
    localStorageUtils.removeItem(storageConstants.sessionKey);
    localStorageUtils.removeItem(storageConstants.localUserKey);
    navigate('/login');
  };

  useEffect(() => {
    const fetchedUser = getCurrentUser();
    if (fetchedUser?.user?.id) {
      //
      setCurrentUser(fetchedUser?.user);
    }
    setUserFetched(true);
  }, []);

  const onClickLink = () => {
    setShowMenu(false);
  };
  return {
    showMenu,
    currentUser,
    userFetched,
    logoutUser,
    getCurrentUser,
    setShowMenu,
    onClickLink
  };
}
