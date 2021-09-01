import { useEffect, useState } from 'react';
import { getCategories } from '../api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(catsFromApi => {
        setCategories(catsFromApi);
      })
      .catch(err => console.log(err));
  }, []);

  return { categories };
};
