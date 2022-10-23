import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { isEmail } from 'validator';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import mainApi from '../../utils/MainApi';
import Header from '../Header/Header';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import './Profile.css';

function Profile({ logOut }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const defaultValues = { name: currentUser.name, email: currentUser.email };
  const { formValues, handleChangeInput, errors, isValid, setIsValid } =
    useFormAndValidation(defaultValues, false);
  const [errorText, setErrorText] = useState('');
  const [infoText, setInfoText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Сохранение данных пользователя
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email } = formValues;
    // Проверка на корректность E-Mail
    if (!isEmail(email)) {
      return setErrorText(
        'В поле E-mail содержится ошибка. Исправьте ее и попробуйте снова.',
      );
    }
    // Проверка на совпадение данных
    if (currentUser.name === name && currentUser.email === email) {
      return setErrorText(
        'Вы ввели идентичные данные. Внесите изменения и попробуйте снова',
      );
    }
    setIsValid(false);
    setIsLoading(true);
    mainApi
      .changeUserInfo({ name, email })
      .then((res) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: res.name,
          email: res.email,
        }));
        setInfoText('Данные пользователя обновлены');
      })
      .catch((e) => {
        console.log(e);
        setErrorText(
          'Произошла ошибка при обновлении данных пользователя. Попробуйте позже',
        );
      })
      .finally(() => setIsLoading(false));
  };

  const changeProfileInput = (e) => {
    handleChangeInput(e);
    // Обновляем данные в сообщении
    setErrorText('');
    setInfoText('');
  };

  return (
    <div className="profile">
      <Header type="movies" />
      <main className="profile__section">
        <UserForm
          title={`Привет, ${currentUser.name}`}
          mode="profile"
          buttonText="Редактировать"
          isLoading={isLoading}
          buttonTextOnLoading="Сохранение..."
          isValid={isValid}
          onSubmit={submitHandler}
          error={errorText}
          info={infoText}
        >
          <InputWithLabel
            type="text"
            title="Имя"
            view="profile"
            name="name"
            value={formValues.name}
            onChange={changeProfileInput}
            error={errors.name}
            required={true}
            minLength="2"
            maxLength="30"
            disabled={isLoading}
          />
          <InputWithLabel
            type="email"
            title="E-mail"
            view="profile"
            name="email"
            value={formValues.email}
            onChange={changeProfileInput}
            error={errors.email}
            required={true}
            disabled={isLoading}
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
