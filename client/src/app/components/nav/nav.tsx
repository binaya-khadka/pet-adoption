import { useState, useEffect, MouseEventHandler } from 'react'
import { useMediaQuery } from 'react-responsive'
import * as styles from './nav.styles'

import { Hamburger } from './styled-component/Hamburger'

export const Nav = () => {

  const mobile = useMediaQuery({ query: '(max-width: 900px)' })

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu: MouseEventHandler<HTMLDivElement> = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    setIsMobile(mobile)
  }, [mobile])

  return (
    <div style={styles.nav}>
      <div style={{ ...styles.inner, height: isMobile ? 60 : 40, display: isMobile ? 'grid' : 'grid' }}>
        <div>
          <a href="/">LOGO</a>
        </div>
        <div style={{ display: isMobile ? '' : 'none' }} onClick={toggleMenu}>
          <Hamburger>
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
        </div>
        <div style={{ ...styles.navLinks, display: isMobile ? 'none' : 'flex' }}>
          <a href="" style={styles.navLink} >Home</a>
          <a href="" style={styles.navLink}>About</a>
          <a href="" style={styles.navLink}>Login</a>
          <a href="" style={styles.navLink}>Signup</a>
        </div>
      </div>
      <div style={{ ...styles.navLinks, display: showMenu ? 'grid' : 'none' }}>
        <a href="" style={styles.navLink} >Home</a>
        <a href="" style={styles.navLink}>About</a>
        <a href="" style={styles.navLink}>Login</a>
        <a href="" style={styles.navLink}>Signup</a>
      </div>
    </div>
  )
}