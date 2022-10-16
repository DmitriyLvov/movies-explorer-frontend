import React from 'react';
import { Link } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import './Login.css';

function Login() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const { email, password } = e.target.elements;
    mainApi
      .login({ email: email.value, password: password.value })
      .then((res) => console.log(res))
      .catch((err) => console.log(`Произошла ошибка: ${err.message}`));
    console.log(password.value);
  };
  return (
    <main className="login">
      <UserForm
        title="Рады видеть!"
        buttonText="Войти"
        mode="auth"
        onSubmit={onSubmit}
      >
        <InputWithLabel
          type="text"
          title="E-mail"
          name="email"
          required={true}
        />
        <InputWithLabel
          name="password"
          type="password"
          title="Пароль"
          error="Что-то пошло не так..."
          required={true}
        />
      </UserForm>
      <p className="login__text">
        Еще не зарегестрированы?
        <Link className="login__text_type_link" to="/sign-up">
          Регистрация
        </Link>
      </p>
    </main>
  );
}

export default Login;
