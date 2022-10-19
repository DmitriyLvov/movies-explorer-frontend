import './popupWithForm.css';

function PopupWithForm({
  title,
  onClose,
  buttonText,
  onSubmit,
  isValid = true,
  visible,
}) {
  return (
    <div className={visible ? 'popup popup_opened' : 'popup'}>
      <form
        onSubmit={onSubmit}
        className={`popup__container popup__container_type_form`}
      >
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        {isValid ? (
          <button
            type="submit"
            className="popup__submit-button popup__submit-button_type_confirm"
          >
            {buttonText}
          </button>
        ) : (
          <button
            type="submit"
            className="popup__submit-button popup__submit-button_type_confirm popup__submit-button_disabled"
            disabled
          >
            {buttonText}
          </button>
        )}
      </form>
    </div>
  );
}

export default PopupWithForm;
