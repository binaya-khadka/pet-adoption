import { useState, useEffect, MouseEventHandler } from 'react'
import { useMediaQuery } from 'react-responsive'
import * as styles from './nav.styles'

import { Hamburger } from './styled-component/Hamburger'
import { getCurrentUser } from '../../store'
import { User } from '../../../interfaces'
import { localStorageUtils } from '../../utils'
import { storageConstants } from '../../../constants'
import { useNavigate } from 'react-router-dom'

export const Nav = () => {


  const navigate = useNavigate();

  const mobile = useMediaQuery({ query: '(max-width: 900px)' })

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [userFetched, setUserFetched] = useState<boolean>(false);

  const toggleMenu: MouseEventHandler<HTMLDivElement> = () => {
    setShowMenu(!showMenu)
  }

  const logoutUser = () => {
    localStorageUtils.removeItem(storageConstants.sessionKey)
    localStorageUtils.removeItem(storageConstants.localUserKey)
    navigate("/login")
  }

  useEffect(() => {
    setIsMobile(mobile)
  }, [mobile])

  useEffect(() => {
    const fetchedUser = getCurrentUser()
    if (fetchedUser?.user?.id) {
      // 
      setCurrentUser(fetchedUser?.user)
    }
    setUserFetched(true)
  }, [])

  return (
    <div style={styles.nav}>
      <div style={{ ...styles.inner, height: isMobile ? 80 : 60, display: 'grid' }}>
        <div style={styles.logoContainer}>
          <a style={styles.logoTitle} href="/">Pet Adoption</a>
        </div>
        <div style={{ display: isMobile ? '' : 'none' }} onClick={toggleMenu}>
          <Hamburger>
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
        </div>
        <div style={{ ...styles.navLinks, display: isMobile ? 'none' : 'flex' }}>
          <a href="/" style={styles.navLink} >Home</a>
          <a href="/about" style={styles.navLink}>About</a>
          {
            userFetched ? <>
              {currentUser?.id ? <>
                <div onClick={logoutUser} style={{ ...styles.navLink, cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Logout
                </div>
              </> : <>
                <a href="/login" style={styles.navLink}>Login</a>
                <a href="/signup" style={styles.navLink}>Signup</a>
              </>}
            </> : null
          }

        </div>
      </div>
      <div style={{ ...styles.navLinks, display: showMenu ? 'grid' : 'none' }}>
        <a href="/" style={styles.navLink} >Home</a>
        <a href="/about" style={styles.navLink}>About</a>


        {userFetched ? <>
          {currentUser?.id ? <>
            {/* <button type="button">
              Logout
            </button> */}
            <div onClick={logoutUser} style={{...styles.navLink, cursor: 'pointer'}}>
              Logout
            </div>
          </> : <>
            <a href="/login" style={styles.navLink}>Login</a>
            <a href="/signup" style={styles.navLink}>Signup</a>
          </>
          }
        </> : null}



      </div>
    </div>
  )
}