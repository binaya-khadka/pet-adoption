import { pageContainer } from '../../../preset-styles';

const container = {
  ...pageContainer,
  padding: '0 20px'
};

const imageContainer = {
  height: '250px',
  width: '220px',
  position: 'relative' as const,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '20px'
};

const img = {
  position: 'absolute' as 'relative',
  top: 0,
  left: 0,
  objectFit: 'cover' as const,
  height: '100%',
  width: '100%'
};

const petName = {
  fontWeight: 600,
  marginBottom: 10
};

const petAge = {
  color: 'tomato',
  marginBottom: 5
};

const petBreed = {};

export { container, imageContainer, img, petName, petAge, petBreed };
