import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

function UserForm({
  title,
  name,
  children,
  buttonText,
  isLoading,
  buttonTextOnLoading,
  onSubmit,
  mode,
}) {
  const navigate = useNavigate();

  const getTitleClass = () => {
    if (mode === 'auth') {
      return 'user-form__title';
    }
    if (mode === 'profile') {
      return 'user-form__title user-form__title_profile';
    }
  };

  const getButtonClass = () => {
    if (mode === 'profile') {
      return 'user-form__submit-button user-form__submit-button_profile';
    } else {
      return 'user-form__submit-button';
    }
  };

  const getInputFieldClass = () => {
    if (mode === 'profile') {
      return 'user-form__input-field user-form__input-field_profile';
    } else {
      return 'user-form__input-field';
    }
  };

  return (
    <div className="user-form">
      {mode === 'auth' && (
        <div
          className="top-logo top-logo_place_userform"
          onClick={() => navigate('/')}
        ></div>
      )}
      <form
        name={`${name}-form`}
        onSubmit={onSubmit}
        className={`user-form__container`}
      >
        <h2 className={getTitleClass()}>{title}</h2>
        <div className={getInputFieldClass()}>{children}</div>

        {
          <button type="submit" className={getButtonClass()}>
            {isLoading ? buttonTextOnLoading : buttonText}
          </button>
        }
      </form>
    </div>
  );
}

export default UserForm;
