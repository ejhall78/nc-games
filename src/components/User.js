import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api';

export const User = () => {
  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    getUser(username)
      .then(userFromApi => setUser(userFromApi))
      .catch(err => console.log(err));
  }, [username]);

  return (
    <div className="User">
      <h3>{username}</h3>
      <img src={user.avatar_url} alt="avatar" />
      <p>Name: {user.name}</p>
    </div>
  );
};
