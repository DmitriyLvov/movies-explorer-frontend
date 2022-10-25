import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import UserForm from '../UserForm/UserForm';
import mainApi from '../../utils/MainApi';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Register.css';

function Register({ setIsLogin }) {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = { name: '', email: '', password: '' };
  const {
    formValues,
    handleChangeInput,
    errors,
    isValid,
    setIsValid,
    resetForm,
  } = useFormAndValidation(defaultValues, false);

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = formValues;
    setIsValid(false);
    setIsLoading(true);
    mainApi
      .registerNewUser({
        email,
        password,
        name,
      })
      .then((res) => {
        const { email, name, _id, token } = res;
        localStorage.setItem('jwt', token);
        setCurrentUser({ email, name, _id });
        setIsLogin(true);
        resetForm();
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          setErrorText(
            'Пользователь с таким E-mail существует. Используйте другой E-mail.',
          );
        } else {
          setErrorText('Ошибка на сервере. Попробуйте позже.');
          setIsValid(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="register">
      <UserForm
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        isLoading={isLoading}
        buttonTextOnLoading="Регистрация..."
        mode="auth"
        onSubmit={onSubmit}
        isValid={isValid}
        error={errorText}
      >
        <InputWithLabel
          type="text"
          title="Имя"
          required={true}
          name="name"
          value={formValues.name}
          onChange={handleChangeInput}
          error={errors.name}
          minLength="2"
          maxLength="30"
          disabled={isLoading}
        />
        <InputWithLabel
          type="email"
          title="E-mail"
          required={true}
          name="email"
          value={formValues.email}
          onChange={handleChangeInput}
          error={errors.email}
          disabled={isLoading}
        />
        <InputWithLabel
          name="password"
          type="password"
          title="Пароль"
          required={true}
          value={formValues.password}
          onChange={handleChangeInput}
          error={errors.password}
          disabled={isLoading}
        />
      </UserForm>
      <p className="register__text">
        Уже зарегистрированы?
        <Link className="register__text_type_link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
