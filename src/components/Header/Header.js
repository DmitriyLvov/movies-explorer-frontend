import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ type, screenWidth }) {
  const navigate = useNavigate();

  const getHeaderStyle = (type) => {
    if (type === 'main') {
      return 'header';
    }
    if (type === 'movies') {
      return 'header header_type_movies';
    }
  };

  return (
    <header className={getHeaderStyle(type)}>
      <div className="top-logo" onClick={() => navigate('/')} />
      <Navigation screenWidth={screenWidth} />
    </header>
  );
}

export default Header;
