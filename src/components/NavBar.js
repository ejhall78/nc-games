import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = ({ categories }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (!menuOpen) setMenuOpen(true);
    else setMenuOpen(false);
  };

  return (
    <div className="navbar is-white has-shadow">
      <div className={menuOpen ? 'navbar' : 'navbar-menu'} id="nav-links">
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
      <button
        className="navbar-burger"
        id="burger"
        onClick={() => toggleMenu()}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};
