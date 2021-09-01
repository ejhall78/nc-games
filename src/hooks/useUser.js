import { useEffect, useState } from 'react';
import { getUser } from '../api';

export const useUser = username => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(username)
      .then(userFromApi => {
        setIsLoading(false);
        setUser(userFromApi);
      })
      .catch(err => console.log(err));
  }, [username]);

  return { user, isLoading };
};
