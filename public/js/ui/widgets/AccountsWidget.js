/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {

    /**
     * Устанавливает текущий элемент в свойство element.
     * Регистрирует обработчики событий с помощью
     * AccountsWidget.registerEvents()
     * Вызывает AccountsWidget.update() для получения
     * списка счетов и последующего отображения.
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * 
     * {HTMLElement} element - HTML элемент виджета
     */
    constructor(element) {
        if (!element) {
            throw new Error('Element is not provided');
        }
        this.element = element; // Сохраняем элемент
        this.registerEvents(); // Регистрируем события
        this.update(); // Обновляем список счетов
    }

    /**
     * При нажатии на .create-account открывает окно
     * #modal-new-account для создания нового счёта.
     * При нажатии на один из существующих счетов
     * вызовет AccountsWidget.onSelectAccount().
     */
    registerEvents() {
        const createAccountButton = this.element.querySelector('.create-account');
        if (createAccountButton) {
            createAccountButton.addEventListener('click', () => {
                const modal = App.getModal('createAccount');
                if (modal) modal.open();
            });
        }

        // Обработчик клика по счетам
        this.element.addEventListener('click', (event) => {
            const accountElement = event.target.closest('.account');
            if (accountElement) {
                event.preventDefault(); // Предотвращаем переход по ссылке
                this.onSelectAccount(accountElement); // Вызываем метод для выбора счета
            }
        });
    }

    /**
     * Метод доступен только авторизованным пользователям
     * (User.current()). Если пользователь авторизован,
     * получает список счетов через Account.list().
     * При успешном ответе очищает ранее отображённые счета
     * через AccountsWidget.clear() и отображает полученные счета.
     */
    update() {
        if (!User.current()) {
            return;
        }

        Account.list({}, (err, response) => {
            if (err) {
                console.error('Ошибка при получении счетов:', err);
                return;
            }

            if (response && response.success && Array.isArray(response.data)) {
                this.clear();
                response.data.forEach(account => {
                    this.renderItem(account);
                });
            } else {
                console.error('Ошибка при получении счетов:', response ? response.error : 'Неизвестная ошибка');
            }
        });
    }

    /**
     * Очищает список ранее отображённых счетов.
     * Для этого необходимо удалять все элементы .account
     * в боковой колонке.
     */
    clear() {
        const accountElements = this.element.querySelectorAll('.account');
        accountElements.forEach(account => account.remove()); // Удаляем все элементы счетов
    }

    /**
     * Срабатывает в момент выбора счёта.
     * Устанавливает текущему выбранному элементу счёта
     * класс .active. Удаляет ранее выбранному элементу
     * счета класс .active.
     * Вызывает App.showPage('transactions', { account_id: id_счёта }).
     * 
     *{HTMLElement} element - Элемент счета
     */
    onSelectAccount(element) {
        const previouslyActive = this.element.querySelector('.account.active');
        if (previouslyActive) {
            previouslyActive.classList.remove('active'); // Убираем класс active у ранее выбранного
        }
        element.classList.add('active'); // Добавляем класс active для текущего счета

        const accountId = element.dataset.id; // Получаем id счета
        App.showPage('transactions', { account_id: accountId }); // Переходим на страницу транзакций
    }

    /**
     * Возвращает HTML-код счета для последующего
     * отображения в боковой колонке.
     * 
     * {Object} item - объект с данными о счёте
     * {string} HTML-код
     */
    getAccountHTML(item) {
        return `
          <li class="account" data-id="${item.id}">
              <a href="#">
                  <span>${item.name}</span> / <span>${item.sum.toFixed(2)} ₽</span>
              </a>
          </li>
      `;
    }

    /**
     * Получает массив с информацией о счетах.
     * Отображает полученный с помощью метода
     * AccountsWidget.getAccountHTML HTML-код элемента
     * и добавляет его внутрь элемента виджета.
     * 
     * {Object} data - Данные о счете
     */
    renderItem(data) {
        const html = this.getAccountHTML(data); // Получаем HTML-код
        this.element.insertAdjacentHTML('beforeend', html); // Вставляем HTML в конец элемента
    }
}
