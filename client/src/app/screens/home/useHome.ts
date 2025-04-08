import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import * as styles from './home.styles';
import { petService } from '@/app/services';

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
