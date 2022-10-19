import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import mainApi from '../../utils/MainApi';
import Header from '../Header/Header';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import './Profile.css';

function Profile() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const defaultValues = { name: currentUser.name, email: currentUser.email };
  const { formValues, handleChangeInput, errors, isValid } =
    useFormAndValidation(defaultValues, false);
  const [errorText, setErrorText] = useState('');

  // Сохранение данных пользователя
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email } = formValues;
    mainApi
      .changeUserInfo({ name, email })
      .then((res) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: res.name,
          email: res.email,
        }));
      })
      .catch((e) => {
        console.log(e);
        setErrorText(
          'Произошла ошибка при обновлении данных пользователя. Попробуйте позже',
        );
      });
  };

  // Выход пользователя из сеанса
  const logOut = () => {
    localStorage.removeItem('SearchData');
    setCurrentUser({});
    localStorage.removeItem('jwt');
  };

  return (
    <div className="profile">
      <Header type="movies" />
      <main className="profile__section">
        <UserForm
          title={`Привет, ${currentUser.name}`}
          mode="profile"
          buttonText="Редактировать"
          isValid={isValid}
          onSubmit={submitHandler}
          error={errorText}
        >
          <InputWithLabel
            type="text"
            title="Имя"
            view="profile"
            name="name"
            value={formValues.name}
            onChange={handleChangeInput}
            error={errors.name}
            required={true}
            minLength="2"
            maxLength="30"
          />
          <InputWithLabel
            type="email"
            title="E-mail"
            view="profile"
            name="email"
            value={formValues.email}
            onChange={handleChangeInput}
            error={errors.email}
            required={true}
          />
        </UserForm>
      </main>
      <footer>
        <Link className="profile__link" onClick={logOut}>
          Выйти из аккаунта
        </Link>
      </footer>
    </div>
  );
}

export default Profile;
