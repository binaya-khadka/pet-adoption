import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store';
import { User } from '../../../interfaces';
import { localStorageUtils } from '../../utils';
import { storageConstants } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = () => {
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

  return (
    <>
      <Navigation>
        <NavInner>
          <NavContent>
            <NavLogo>
              <NavLink style={{ fontSize: 18 }} href="/">
                Pet Adoption
              </NavLink>
            </NavLogo>

            <Burger
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <BurgerLine showMenu={showMenu} />
              <BurgerLine showMenu={showMenu} />
              <BurgerLine showMenu={showMenu} />
            </Burger>

            <NavLinks showMenu={showMenu}>
              <NavLink onClick={onClickLink} href="/">
                Home
              </NavLink>
              <NavLink onClick={onClickLink} href="/about">
                About
              </NavLink>
              {userFetched ? (
                <>
                  {currentUser?.id ? (
                    <>
                      <NavLink onClick={onClickLink} href="/addpet">
                        Add Pet
                      </NavLink>
                      <NavLink onClick={logoutUser}>Logout</NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink onClick={onClickLink} href="/login">
                        Login
                      </NavLink>
                      <NavLink onClick={onClickLink} href="/signup">
                        Signup
                      </NavLink>
                    </>
                  )}
                </>
              ) : null}
            </NavLinks>
          </NavContent>
        </NavInner>
      </Navigation>
    </>
  );
};

const Navigation = styled.nav`
  background-color: var(--background-color);
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const NavContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 20px 0;
  align-items: center;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--white-color);
  cursor: pointer;
  &:hover {
    color: var(--primary-color);
  }
`;

const Burger = styled.div`
  display: block;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

const BurgerLine = styled.div<{ showMenu: boolean }>`
  width: 24px;
  height: 2px;
  margin: 5px 0;
  background-color: var(--white-color);

  transition: all 0.3s ease;

  &:first-child {
    transform: ${(props) =>
      props.showMenu ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
  }

  &:nth-child(2) {
    opacity: ${(props) => (props.showMenu ? 0 : 1)};
  }

  &:last-child {
    transform: ${(props) =>
      props.showMenu ? 'rotate(-45deg) translate(6px, -5px)' : 'none'};
  }
`;

const NavLinks = styled.ul<{ showMenu: boolean }>`
  display: ${(props) => (props.showMenu ? 'grid' : 'none')};
  grid-auto-flow: row;
  justify-content: center;
  gap: 20px;
  @media (min-width: 768px) {
    display: flex;
  }
`;
