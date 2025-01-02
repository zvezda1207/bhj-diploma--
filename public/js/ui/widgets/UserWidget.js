/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
        throw new Error('Element is not provided');
    }
    this.element = element; // Сохранение элемента
    this.update(); // Обновление информации о пользователе сразу после создания
  }

   /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   */
  update() {
    const user = User.current(); // Получаем информацию о текущем пользователе
    const userNameElement = this.element.querySelector('.user-name'); // Ищем элемент для отображения имени

    if (user) {
        // Если пользователь авторизован, обновляем имя
        userNameElement.textContent = user.name; // Устанавливаем имя пользователя
        this.element.classList.add('authorized'); // Добавляем класс для авторизованного состояния
    } else {
        userNameElement.textContent = 'Гость'; // Если пользователь не авторизован, показываем "Гость"
        this.element.classList.remove('authorized'); // Убираем класс авторизованного состояния
    }
  }
}
