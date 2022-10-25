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
  info,
}) {
  const navigate = useNavigate();
  console.log(info);
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

  const getMessageClass = () => {
    let style;

    if (mode === 'profile') {
      style = 'user-form__message user-form__message_type_profile';
    } else {
      style = 'user-form__message';
    }
    if (error) {
      style += ' user-form__message_color_red';
    }
    if (info) {
      style += ' user-form__message_color_white';
    }
    return style;
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
        <span className={getMessageClass()}>{error ? error : info}</span>
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
