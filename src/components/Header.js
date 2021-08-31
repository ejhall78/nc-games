import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="Header">
      <Link to="/">
        <h1>nc-games</h1>
      </Link>
      <p>User Profile</p>
      <p>Search Bar</p>
    </header>
  );
};
