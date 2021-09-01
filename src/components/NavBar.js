import { NavLink } from 'react-router-dom';

export const NavBar = ({ categories }) => {
  return (
    <div className="NavBar">
      <NavLink to="/categories">All Categories</NavLink>
      {categories.map(({ slug }) => {
        return (
          <NavLink
            key={slug}
            className="NavBar__category-button"
            to={`/reviews/categories/${slug}`}
          >
            {slug}
          </NavLink>
        );
      })}
    </div>
  );
};
