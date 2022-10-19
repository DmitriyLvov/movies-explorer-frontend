import './InputWithLabel.css';

function InputWithLabel({
  title,
  error,
  type,
  name,
  view,
  value,
  required = false,
  onChange,
  minLength,
  maxLength,
}) {
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

  const getSpanErrorClass = () => {
    if (view === 'profile') {
      return 'input-with-label__error input-with-label__error_type_profile';
    } else {
      return 'input-with-label__error';
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
        value={value}
        required={required}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
      />
      <span className={getSpanErrorClass()}>{error ? error : ''}</span>
    </div>
  );
}

export default InputWithLabel;
