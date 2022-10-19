import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import mainApi from '../../utils/MainApi';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const defaultValues = { password: '', email: '' };
  const { formValues, handleChangeInput, errors, isValid, resetForm } =
    useFormAndValidation(defaultValues, false);

  const [errorText, setErrorText] = useState('');

  const { setCurrentUser } = useContext(CurrentUserContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    mainApi
      .login({ email, password })
      .then((res) => {
        const { token, name, email, _id } = res;
        localStorage.setItem('jwt', token);
        setCurrentUser({ email, name, _id });
        resetForm();
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        if (err === 401) {
          setErrorText(
            'Пользователь не найден. Вероятно, вы ввели неправильное имя и/или пароль.',
          );
        } else {
          setErrorText('Ошибка на сервере. Попробуйте позже');
        }
      });
  };

  return (
    <section className="login">
      <UserForm
        title="Рады видеть!"
        buttonText="Войти"
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
        />
        <InputWithLabel
          name="password"
          type="password"
          title="Пароль"
          value={formValues.password}
          error={errors.password}
          required={true}
          onChange={handleChangeInput}
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
