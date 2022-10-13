import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import './Login.css';

function Login() {
  return (
    <section className="login">
      <UserForm title="Рады видеть!" buttonText="Войти" mode="auth">
        <InputWithLabel type="text" title="E-mail" />
        <InputWithLabel
          type="password"
          title="Пароль"
          error="Что-то пошло не так..."
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
