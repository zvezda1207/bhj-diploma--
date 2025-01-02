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
        Account.list((err, response) => {
            if (err) {
                console.error('Ошибка при получении списка счетов:', err); // Логирование ошибки
                return;
            }
            console.log('Ответ от сервера:', response); // Логирование ответа от сервера

            if (response && Array.isArray(response.accounts)) {
                const accountsSelect = this.element.querySelector('select[name="account_id"]');
                accountsSelect.innerHTML = '';

                response.accounts.forEach(account => {
                    const option = document.createElement('option');
                    option.value = account.id;
                    option.textContent = account.name;
                    accountsSelect.appendChild(option);
                });
            } else if (response.error) {
                console.error('Ошибка от сервера:', response.error);
            } else {
                console.error('Ожидался массив, но получено:', response);
            }
        });
    }

    onSubmit(data) {
        Transaction.create(data, (err, response) => {
            if (err) {
                console.error('Ошибка при создании транзакции:', err);
                return;
            }

            if (response && response.success) {
                this.element.reset();
                const modal = App.getModal('new-transaction');
                if (modal) {
                    modal.close();
                }
                App.update();
            } else {
                console.error('Не удалось создать транзакцию:', response);
            }
        });
    }
}