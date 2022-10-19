import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import './Login.css';

function Login() {
  return (
    <>
      <header></header>
      <main className="login">
        <UserForm title="Рады видеть!" buttonText="Войти" mode="auth">
          <InputWithLabel type="text" title="E-mail" required={true} />
          <InputWithLabel
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
      <footer></footer>
    </>
  );
}

export default Login;
