import { useState, useEffect } from 'react';
import { getUser } from '../api';

export const useCurrentUser = username => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getUser(username)
      .then(userFromApi => setCurrentUser(userFromApi))
      .catch(err => console.log(err));
  }, [username]);

  return { currentUser };
};
