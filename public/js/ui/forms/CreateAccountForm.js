/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    // Вызываем метод для создания счёта с данными формы
    Account.create(data, (err, response) => {
        if (err) {
            console.error('Ошибка при создании счета:', err);
            return; // Можно добавить дополнительную обработку ошибок для уведомления пользователя
        }

        if (response && response.success) {
            this.element.reset(); // Сбрасываем форму после успешной регистрации
            const modal = App.getModal('new-account'); // Получаем модальное окно для создания счета
            modal.close(); // Закрываем модальное окно
            App.update(); // Обновляем приложение для отражения нового счета
        }
    });
  }
}