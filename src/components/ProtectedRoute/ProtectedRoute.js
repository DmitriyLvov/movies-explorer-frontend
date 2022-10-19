import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...props }) {
  const { currentUser } = useContext(CurrentUserContext);
  return currentUser?.email ? <Component {...props} /> : <Navigate to="/" />;
}

export default ProtectedRoute;
