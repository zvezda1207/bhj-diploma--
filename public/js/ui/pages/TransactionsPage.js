/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта.
 */
class TransactionsPage {

    /**
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * Сохраняет переданный элемент и регистрирует события
     * через registerEvents()
     * 
     * {HTMLElement} element - элемент страницы 
     */
    constructor(element) {
        if (!element) {
            throw new Error('Element is not provided'); // Проверяем, что элемент передан
        }

        this.element = element; // Сохраняем элемент
        this.lastOptions = {}; // Переменная для хранения параметров последнего состояния
        this.registerEvents(); // Регистрируем события
    }

    /**
     * Вызывает метод render для отрисовки страницы.
     */
    update() {
        this.render(this.lastOptions); // Перерисовываем с последними параметрами
    }

    /**
     * Отслеживает нажатие на кнопку удаления транзакции
     * и удаления самого счёта. 
     * Внутри обработчика пользуйтесь
     * методами removeTransaction и removeAccount соответственно.
     */
    registerEvents() {
        const removeAccountButton = this.element.querySelector('.remove-account');
        if (removeAccountButton) {
            removeAccountButton.addEventListener('click', () => {
                this.removeAccount();
            });
        }

        this.element.addEventListener('click', (event) => {
            const removeButton = event.target.closest('.transaction__remove');
            if (removeButton) {
                const transactionId = removeButton.dataset.id;
                if (transactionId) {
                    this.removeTransaction(transactionId);
                }
            }
        });
    }

    /**
     * Удаляет счёт. 
     * Необходимо показать диалоговое окно (с помощью confirm())
     * Если пользователь согласен удалить счёт, вызовите
     * Account.remove, а также clear с пустыми данными для очистки страницы.
     * По успешному удалению вызывайте App.updateWidgets() и App.updateForms().
     */
    removeAccount() {
        if (!this.lastOptions.account_id) return;

        if (confirm('Вы действительно хотите удалить счёт?')) {
            Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
                if (err) {
                    console.error('Ошибка при удалении счета:', err);
                    return;
                }
                if (response && response.success) {
                    this.clear();
                    App.updateWidgets();
                    App.updateForms();
                } else {
                    console.error('Ошибка при удалении счета:', response ? response.error : 'Неизвестная ошибка');
                }
            });
        }
    }

    /**
     * Удаляет транзакцию (доход или расход).
     * Требует подтверждения действия (с помощью confirm()).
     * По удалению транзакции вызывайте App.update() для обновления приложения.
     */
    removeTransaction(id) {
        if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
            Transaction.remove({ id: id }, (err, response) => {
                if (err) {
                    console.error('Ошибка при удалении транзакции:', err);
                    return;
                }
                if (response && response.success) {
                    this.update();
                } else {
                    console.error('Ошибка при удалении транзакции:', response ? response.error : 'Неизвестная ошибка');
                }
            });
        }
    }

    /**
     * Получает название счёта и отображает
     * его через renderTitle.
     * Получает список Transaction.list и передаёт
     * в renderTransactions.
     * 
     * {Object} options - параметры для рендеринга
     */
    render(options) {
        if (!options || !options.account_id) return;

        this.lastOptions = options;
        Account.get(options.account_id, (err, response) => {
            if (err) {
                console.error('Ошибка при получении счета:', err);
                return;
            }
            if (response && response.success && response.data) {
                this.renderTitle(response.data.name);
                Transaction.list({ account_id: options.account_id }, (err, transactionsResponse) => {
                    if (err) {
                        console.error('Ошибка при получении транзакций:', err);
                        return;
                    }
                    if (transactionsResponse && transactionsResponse.success && Array.isArray(transactionsResponse.data)) {
                        this.renderTransactions(transactionsResponse.data);
                    } else {
                        this.renderTransactions([]);
                    }
                });
            }
        });
    }

    /**
     * Очищает страницу.
     * Вызывает renderTransactions с пустым массивом.
     * Устанавливает заголовок: «Название счёта».
     */
    clear() {
        this.renderTransactions([]); // Очищаем все транзакции
        this.renderTitle('Название счёта'); // Очищаем заголовок
        this.lastOptions = {}; // Очищаем последние опции
    }

    /**
     * Устанавливает заголовок в элемент .content-title.
     * 
     * {string} name - название счёта
     */
    renderTitle(name) {
        const title = this.element.querySelector('.content-title');
        title.textContent = name; // Устанавливаем имя счёта
    }

    /**
     * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
     * в формат «10 марта 2019 г. в 03:20».
     * 
     * {string} date - строка с датой
     * {string} отформатированная дата
     */
    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(date).toLocaleString('ru-RU', options); // Возврат в нужном формате
    }

    /**
     * Формирует HTML-код транзакции (дохода или расхода).
     * 
     * {Object} item - объект с информацией о транзакции
     * {string} HTML-код транзакции
     */
    getTransactionHTML(item) {
        const transactionType = item.type === 'expense' ? 'transaction_expense' : 'transaction_income'; // Определяем тип
        const formattedDate = this.formatDate(item.created_at); // Форматируем дату
        return `
          <div class="transaction ${transactionType} row">
              <div class="col-md-7 transaction__details">
                  <div class="transaction__icon">
                      <span class="fa fa-money fa-2x"></span>
                  </div>
                  <div class="transaction__info">
                      <h4 class="transaction__title">${item.name}</h4>
                      <div class="transaction__date">${formattedDate}</div>
                  </div>
              </div>
              <div class="col-md-3">
                  <div class="transaction__summ">${item.sum} <span class="currency">₽</span></div>
              </div>
              <div class="col-md-2 transaction__controls">
                  <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                      <i class="fa fa-trash"></i>
                  </button>
              </div>
          </div>
      `;
    }

    /**
     * Отрисовывает список транзакций на странице
     * используя getTransactionHTML.
     * 
     * {Array} data - массив данных с транзакциями
     */
    renderTransactions(data) {
        const content = this.element.querySelector('.content');
        content.innerHTML = ''; // Очищаем предыдущие транзакции
        data.forEach(transaction => {
            const transactionHTML = this.getTransactionHTML(transaction); // Генерируем HTML
            content.insertAdjacentHTML('beforeend', transactionHTML); // Вставляем в содержимое
        });
    }
}