import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className="NavBar">
      <Link to="/categories">Categories</Link>
    </div>
  );
};
