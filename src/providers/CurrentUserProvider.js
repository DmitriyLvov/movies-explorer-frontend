import { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
