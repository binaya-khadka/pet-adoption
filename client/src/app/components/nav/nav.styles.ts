import { pageContainer } from "../../../preset-styles"

const nav = {
  backgroundColor: '#d1e0e0',
}

const inner = {
  ...pageContainer,
  padding: '0 15px',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  fontSize: 18
}

const navLinks = {
  display: 'flex',
  justifyContent: 'center',
  padding: '8px 10px',
  gap: '20px'
}

const navLink = {
  textDecoration: 'none',
  color: '#121212',
}

const logoContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}

export const logoTitle = {
  textDecoration: 'none',
  fontWeight: 600,
  color: '#121212'
}

export {
  nav,
  inner,
  navLinks,
  navLink,
  logoContainer
}