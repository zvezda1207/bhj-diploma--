/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 */
class Sidebar {

  /** 
   * Запускает initAuthLinks и initToggleButton 
   */
  static init() {
      this.initAuthLinks();
      this.initToggleButton();
  }

  /** 
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle 
   */
  static initToggleButton() {
      const toggleButton = document.querySelector('.sidebar-toggle'); // Поиск кнопки
      if (toggleButton) {
          toggleButton.addEventListener('click', (event) => {
              event.preventDefault(); // предотвращаем переход по ссылке

              const body = document.body; // Получаем элемент body

              // Проверяем наличие классов и добавляем или убираем их
              body.classList.toggle('sidebar-open');
              body.classList.toggle('sidebar-collapse');
          });
      } else {
          console.warn('Кнопка для переключения боковой колонки не найдена');
      }
  }

  /** 
   * Инициализация ссылок для авторизации: вход, регистрация, выход 
   */
  static initAuthLinks() {
      const loginButton = document.querySelector('.menu-item_login > a'); // Поиск ссылки входа
      const registerButton = document.querySelector('.menu-item_register > a'); // Поиск ссылки регистрации
      const logoutButton = document.querySelector('.menu-item_logout > a'); // Поиск ссылки выхода

      // Проверяем наличие кнопок и добавляем обработчики
      if (loginButton) {
          loginButton.addEventListener('click', (event) => {
              event.preventDefault(); // предотвращаем переход по ссылке
              const modal = App.getModal('login'); // Получаем модальное окно для входа

              if (modal) {
                  modal.open(); // Открываем модальное окно
              } else {
                  console.error('Модальное окно для входа не найдено');
              }
          });
      } else {
          console.warn('Кнопка "Вход" не найдена');
      }

      if (registerButton) {
          registerButton.addEventListener('click', (event) => {
              event.preventDefault(); // предотвращаем переход по ссылке
              const modal = App.getModal('register'); // Получаем модальное окно для регистрации

              if (modal) {
                  modal.open(); // Открываем модальное окно
              } else {
                  console.error('Модальное окно для регистрации не найдено');
              }
          });
      } else {
          console.warn('Кнопка "Регистрация" не найдена');
      }

      if (logoutButton) {
          logoutButton.addEventListener('click', (event) => {
              event.preventDefault(); // предотвращаем переход по ссылке
              User.logout((err) => {
                  if (err) {
                      console.error('Ошибка при выходе:', err);
                  } else {
                      App.setState('init'); // Меняем состояние приложения на 'init'
                  }
              });
          });
      } else {
          console.warn('Кнопка "Выход" не найдена');
      }
    }
}