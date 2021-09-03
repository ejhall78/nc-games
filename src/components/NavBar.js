import { NavLink } from 'react-router-dom';

export const NavBar = ({ categories }) => {
  return (
    <div className="navbar">
      <NavLink className="navbar-item" to="/categories">
        All Categories
      </NavLink>
      {categories.map(({ slug }) => {
        return (
          <NavLink
            key={slug}
            className="navbar-item"
            to={`/reviews/categories/${slug}`}
          >
            {slug}
          </NavLink>
        );
      })}
    </div>
  );
};
