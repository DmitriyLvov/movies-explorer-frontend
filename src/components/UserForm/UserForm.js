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
  isValid,
  error,
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
    let buttonClass;
    if (mode === 'profile') {
      buttonClass = 'user-form__submit-button user-form__submit-button_profile';
    } else {
      buttonClass = 'user-form__submit-button';
    }
    if (!isValid) {
      buttonClass += ' user-form__submit-button_disabled';
    }
    return buttonClass;
  };

  const getInputFieldClass = () => {
    if (mode === 'profile') {
      return 'user-form__input-field user-form__input-field_profile';
    } else {
      return 'user-form__input-field';
    }
  };

  const getErrorClass = () => {
    if (mode === 'profile') {
      return 'user-form__error user-form__error_type_profile';
    } else {
      return 'user-form__error';
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
        <span className={getErrorClass()}>{error}</span>
        {isValid ? (
          <button type="submit" className={getButtonClass()}>
            {isLoading ? buttonTextOnLoading : buttonText}
          </button>
        ) : (
          <button type="submit" className={getButtonClass()} disabled>
            {isLoading ? buttonTextOnLoading : buttonText}
          </button>
        )}
      </form>
    </div>
  );
}

export default UserForm;
