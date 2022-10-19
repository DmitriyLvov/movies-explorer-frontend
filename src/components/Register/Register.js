import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import UserForm from '../UserForm/UserForm';
import mainApi from '../../utils/MainApi';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Register.css';

function Register() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');

  const defaultValues = { name: '', email: '', password: '' };
  const { formValues, handleChangeInput, errors, isValid, resetForm } =
    useFormAndValidation(defaultValues, false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const { email, password, name } = formValues;
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
        }
      });
  };

  return (
    <section className="register">
      <UserForm
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
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
        />
        <InputWithLabel
          type="email"
          title="E-mail"
          required={true}
          name="email"
          value={formValues.email}
          onChange={handleChangeInput}
          error={errors.email}
        />
        <InputWithLabel
          name="password"
          type="password"
          title="Пароль"
          required={true}
          value={formValues.password}
          onChange={handleChangeInput}
          error={errors.password}
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
