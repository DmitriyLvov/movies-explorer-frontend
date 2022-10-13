import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import './Register.css';

function Register() {
  return (
    <section className="register">
      <UserForm
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        mode="auth"
      >
        <InputWithLabel type="text" title="Имя" />
        <InputWithLabel type="text" title="E-mail" />
        <InputWithLabel
          type="password"
          title="Пароль"
          error="Что-то пошло не так..."
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
