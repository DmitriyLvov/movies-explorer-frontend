import './Profile.css';
import Header from '../Header/Header';
import UserForm from '../UserForm/UserForm';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="profile">
      <Header type="movies" />
      <section className="profile__section">
        <UserForm
          title="Привет, Виталий!"
          mode="profile"
          buttonText="Редактировать"
          width="410px"
        >
          <InputWithLabel
            type="text"
            title="Имя"
            view="profile"
            name="name"
            value="Виталий"
            required={true}
          />
          <InputWithLabel
            type="text"
            title="E-mail"
            view="profile"
            name="email"
            value="pochta@yandex.ru"
            required={true}
          />
        </UserForm>
        <Link to="/sign-out" className="profile__link">
          Выйти из аккаунта
        </Link>
      </section>
    </div>
  );
}

export default Profile;
