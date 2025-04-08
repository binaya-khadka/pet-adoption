import * as styles from './home.styles';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { petService } from '../../services';

export default function useHome() {
  const { data, isLoading, isError } = useQuery('home', petService.getAllPets);

  return {
    styles,
    Link,
    data,
    isLoading,
    isError
  };
}
