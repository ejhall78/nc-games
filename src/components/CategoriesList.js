import { Link } from 'react-router-dom';

export const CategoriesList = ({ categories }) => {
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
