import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api';

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(catsFromApi => {
        setCategories(catsFromApi);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
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
