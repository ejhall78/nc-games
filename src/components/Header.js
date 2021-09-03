import { Link } from 'react-router-dom';

export const Header = ({ currentUser }) => {
  const { username } = currentUser;

  return (
    <header className="Header">
      <Link to="/">
        <h1 className="title">nc-games</h1>
      </Link>
      <Link to={`/users/${username}`}>
        <p>User Profile</p>
      </Link>
    </header>
  );
};
