import React from 'react';
import './InputWithLabel.css';

function InputWithLabel({ title, error, type, name, view, value }) {
  const getMainClass = () => {
    if (view === 'profile') {
      return 'input-with-label input-with-label_profile';
    } else {
      return 'input-with-label';
    }
  };

  const getInputClass = () => {
    if (view === 'profile') {
      return 'input-with-label__input input-with-label__input_profile';
    } else {
      return 'input-with-label__input';
    }
  };

  const getLabelClass = () => {
    if (view === 'profile') {
      return 'input-with-label__title input-with-label__title_profile';
    } else {
      return 'input-with-label__title';
    }
  };

  return (
    <div className={getMainClass()}>
      <label htmlFor={name} className={getLabelClass()}>
        {title}
      </label>
      <input
        type={type}
        name={name}
        className={getInputClass()}
        defaultValue={value}
      ></input>
      <span className="input-with-label__error">{error}</span>
    </div>
  );
}

export default InputWithLabel;
