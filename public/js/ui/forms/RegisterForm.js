/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
        if (err) {
            console.error('Ошибка регистрации:', err);
            return; // Обработайте ошибку
        }
        if (response && response.success) {
            App.setState('user-logged'); // Успех, меняем состояние приложения
            this.element.reset(); // Сброс формы
            Modal.close('modal-register'); // Закрываем модал
        } else {
            console.error('Ошибка при регистрации:', response.error);
        }
    });
  }
}