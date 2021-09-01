import { useEffect, useState } from 'react';
import { getCategories } from '../api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then(catsFromApi => {
        setCategories(catsFromApi);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return { categories, isLoading };
};
