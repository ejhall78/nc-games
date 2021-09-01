import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api';

export const CategoriesList = ({
  categories,
  setCategories,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then(catsFromApi => {
        setIsLoading(false);
        setCategories(catsFromApi);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {isLoading ? 'Loading...' : null}
      <ul className="CategoriesList">
        {categories.map(({ slug, description }) => {
          return (
            <li key={slug}>
              <Link to={`/reviews/categories/${slug}`}>
                <h2>{slug}</h2>
              </Link>
              <p>{description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
