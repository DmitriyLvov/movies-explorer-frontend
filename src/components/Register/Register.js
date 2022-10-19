import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import './Register.css';

function Register() {
  return (
    <>
      <header />
      <section className="register">
        <UserForm
          title="Добро пожаловать!"
          buttonText="Зарегистрироваться"
          mode="auth"
        >
          <InputWithLabel type="text" title="Имя" required={true} />
          <InputWithLabel type="text" title="E-mail" required={true} />
          <InputWithLabel
            type="password"
            title="Пароль"
            error="Что-то пошло не так..."
            required={true}
          />
        </UserForm>
        <p className="register__text">
          Уже зарегистрированы?
          <Link className="register__text_type_link" to="/sign-in">
            Войти
          </Link>
        </p>
      </section>
      <footer />
    </>
  );
}

export default Register;
