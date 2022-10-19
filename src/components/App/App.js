import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Login from '../Login/Login';
import './App.css';
import Register from '../Register/Register';
import Page404 from '../Page404/Page404';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="root">
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/saved-movies" element={<SavedMovies />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Main />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
