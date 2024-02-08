import { pageContainer } from "../../../preset-styles"

const nav = {
  backgroundColor: '#dadada',
}

const inner = {
  ...pageContainer,
  padding: '0 15px',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  // justifyContent: 'center',
}

const navLinks = {
  display: 'flex',
  justifyContent: 'center',
  padding: '8px 10px',
  gap: 10
}

const navLink = {
  textDecoration: 'none',
  color: '#121212',
}

export {
  nav,
  inner,
  navLinks,
  navLink
}