import { useState, useCallback } from 'react';
import { isEmail } from 'validator';

export function useFormAndValidation(defaultValues, defaultIsValid) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(defaultIsValid);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    let resultValues = { ...formValues, [name]: value };
    setFormValues(resultValues);
    const resultErrors = { ...errors, [name]: e.target.validationMessage };
    setIsValid(e.target.closest('form').checkValidity());
    // Проверка на совпадение данных по умолчанию
    let isRepeated = true;
    for (const key in resultValues) {
      if (Object.hasOwnProperty.call(formValues, key)) {
        if (
          resultValues[key] !== defaultValues[key] ||
          defaultValues[key].length === 0
        ) {
          isRepeated = false;
          break;
        }
      }
    }

    // Есди данные совпадают, то прописываем ошибку во все инпуты
    if (isRepeated) {
      setIsValid(false);
      for (const key in formValues) {
        if (Object.hasOwnProperty.call(formValues, key)) {
          resultErrors[key] = 'Данные совпадают';
        }
      }
    } else {
      // Если данные не совпадают, то удаляем ошибку, если имеется
      for (const key in resultErrors) {
        if (
          Object.hasOwnProperty.call(resultErrors, key) &&
          resultErrors[key] === 'Данные совпадают'
        )
          resultErrors[key] = '';
      }
    }

    // Проверка на валидность email
    if (e.target.type === 'email') {
      if (!isEmail(value)) {
        setIsValid(false);
        resultErrors[name] = 'Вы ввели некорректный email.';
      }
    }
    setErrors(resultErrors);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}) => {
      setFormValues(defaultValues);
      setErrors(newErrors);
      setIsValid(defaultIsValid);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFormValues, setErrors, setIsValid],
  );

  return {
    formValues,
    setFormValues,
    handleChangeInput,
    errors,
    isValid,
    resetForm,
    setIsValid,
  };
}
