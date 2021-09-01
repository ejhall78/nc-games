import { useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const User = () => {
  const { username } = useParams();
  const { user, isLoading } = useUser(username);

  return (
    <div className="User">
      <h3>{username}</h3>
      <p>{isLoading ? 'Loading...' : null}</p>
      <img src={user.avatar_url} alt="avatar" />
      <p>Name: {isLoading ? 'Loading...' : user.name}</p>
    </div>
  );
};
