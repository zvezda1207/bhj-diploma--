/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 */

      

   /** 
   * Инициализация ссылок для авторизации: вход, регистрация, выход 
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
        const toggleButton = document.querySelector('.sidebar-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', (event) => {
                event.preventDefault();
                document.body.classList.toggle('sidebar-open');
                document.body.classList.toggle('sidebar-collapse');
            });
        } else {
            console.warn('Кнопка для переключения боковой колонки не найдена');
        }
    }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */    
    static initAuthLinks() {
        const loginButton = document.querySelector('.menu-item_login > a');
        const registerButton = document.querySelector('.menu-item_register > a');
        const logoutButton = document.querySelector('.menu-item_logout > a');

        if (loginButton) {
            loginButton.addEventListener('click', (event) => {
                event.preventDefault();
                const modal = App.getModal('login');
                if (modal) {
                    modal.open();
                } else {
                    console.error('Модальное окно для входа не найдено');
                }
            });
        } else {
            console.warn('Кнопка "Вход" не найдена');
        }

        if (registerButton) {
            registerButton.addEventListener('click', (event) => {
                event.preventDefault();
                const modal = App.getModal('register');
                if (modal) {
                    modal.open();
                } else {
                    console.error('Модальное окно для регистрации не найдено');
                }
            });
        } else {
            console.warn('Кнопка "Регистрация" не найдена');
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', (event) => {
                event.preventDefault();
                User.logout((err) => {
                    if (err) {
                        console.error('Ошибка при выходе:', err);
                    } else {
                        App.setState('init');
                    }
                });
            });
        } else {
            console.warn('Кнопка "Выход" не найдена');
        }
    }
}