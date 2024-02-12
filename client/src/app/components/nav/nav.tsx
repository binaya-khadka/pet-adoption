import { useState, useEffect, MouseEventHandler } from 'react'
import { useMediaQuery } from 'react-responsive'
import * as styles from './nav.styles'

import { Hamburger } from './styled-component/Hamburger'
// import { getCurrentUser } from '../../store'

export const Nav = () => {

  const mobile = useMediaQuery({ query: '(max-width: 900px)' })

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu: MouseEventHandler<HTMLDivElement> = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    setIsMobile(mobile)
    // const currentUser = getCurrentUser();
  }, [mobile])

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
          <a href="/login" style={styles.navLink}>Login</a>
          <a href="/signup" style={styles.navLink}>Signup</a>
        </div>
      </div>
      <div style={{ ...styles.navLinks, display: showMenu ? 'grid' : 'none' }}>
        <a href="/" style={styles.navLink} >Home</a>
        <a href="/about" style={styles.navLink}>About</a>
        <a href="/login" style={styles.navLink}>Login</a>
        <a href="/signup" style={styles.navLink}>Signup</a>
      </div>
    </div>
  )
}