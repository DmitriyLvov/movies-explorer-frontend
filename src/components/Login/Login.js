import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import mainApi from '../../utils/MainApi';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Login.css';

function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const defaultValues = { password: '', email: '' };
  const {
    formValues,
    handleChangeInput,
    errors,
    isValid,
    resetForm,
    setIsValid,
  } = useFormAndValidation(defaultValues, false);

  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setCurrentUser } = useContext(CurrentUserContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    setIsValid(false);
    setIsLoading(true);
    mainApi
      .login({ email, password })
      .then((res) => {
        const { token, user } = res;
        const { email, name, _id } = user;
        localStorage.setItem('jwt', token);
        setCurrentUser({ email, name, _id });
        setIsLogin(true);
        resetForm();
        navigate('/movies');
      })
      .catch((err) => {
        if (err === 401) {
          setErrorText(
            'Пользователь не найден. Вероятно, вы ввели неправильное имя и/или пароль.',
          );
        } else {
          setErrorText('Ошибка на сервере. Попробуйте позже');
          setIsValid(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="login">
      <UserForm
        title="Рады видеть!"
        buttonText="Войти"
        isLoading={isLoading}
        buttonTextOnLoading="Выполняется вход..."
        mode="auth"
        onSubmit={onSubmit}
        isValid={isValid}
        error={errorText}
      >
        <InputWithLabel
          type="email"
          title="E-mail"
          name="email"
          required={true}
          error={errors.email}
          value={formValues.email}
          onChange={handleChangeInput}
          disabled={isLoading}
        />
        <InputWithLabel
          name="password"
          type="password"
          title="Пароль"
          value={formValues.password}
          error={errors.password}
          required={true}
          onChange={handleChangeInput}
          disabled={isLoading}
        />
      </UserForm>
      <p className="login__text">
        Еще не зарегестрированы?
        <Link className="login__text_type_link" to="/sign-up">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
