/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции.
 */
class CreateTransactionForm extends AsyncForm {

    /**
     * Вызывает родительский конструктор и
     * метод renderAccountsList.
     *
     * {HTMLElement} element - элемент формы
     */
    constructor(element) {
        super(element);
        this.renderAccountsList(); // Вызываем метод для отображения списка счетов
    }

    /**
     * Получает список счетов с помощью Account.list.
     * Обновляет в форме всплывающего окна выпадающий список.
     */
    renderAccountsList() {
        Account.list({}, (err, response) => {
            if (err) {
                console.error('Ошибка при получении списка счетов:', err);
                return;
            }

            if (response && response.success && Array.isArray(response.data)) {
                const accountsSelect = this.element.querySelector('select[name="account_id"]');
                if (accountsSelect) {
                    accountsSelect.innerHTML = '';

                    response.data.forEach(account => {
                        const option = document.createElement('option');
                        option.value = account.id;
                        option.textContent = account.name;
                        accountsSelect.appendChild(option);
                    });
                }
            } else {
                console.error('Ошибка при получении списка счетов:', response ? response.error : 'Неизвестная ошибка');
            }
        });
    }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
    onSubmit(data) {
        Transaction.create(data, (err, response) => {
            if (err) {
                console.error('Ошибка при создании транзакции:', err);
                return;
            }

            if (response && response.success) {
                this.element.reset();
                // Определяем, какое модальное окно закрывать
                const isIncome = this.element.id === 'new-income-form';
                const modalName = isIncome ? 'newIncome' : 'newExpense';
                const modal = App.getModal(modalName);
                if (modal) {
                    modal.close();
                }
                App.update();
            } else {
                console.error('Не удалось создать транзакцию:', response ? response.error : 'Неизвестная ошибка');
            }
        });
    }
}