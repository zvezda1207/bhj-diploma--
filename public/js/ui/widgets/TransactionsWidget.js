/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
    /**
     * Устанавливает полученный элемент
     * в свойство element.
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            throw new Error('Element is not provided'); // Проверяем, что элемент передан
        }

        this.element = element; // Сохраняем элемент
        this.registerEvents(); // Регистрируем обработчики событий
    }

    /**
     * Регистрирует обработчики нажатия на 
     * кнопки «Новый доход» и «Новый расход». 
     * При нажатии вызывает Modal.open() для 
     * экземпляра окна 
     */
    registerEvents() {
        const newIncomeButton = this.element.querySelector('.create-income-button');
        const newExpenseButton = this.element.querySelector('.create-expense-button');

        if (newIncomeButton) {
            newIncomeButton.addEventListener('click', (event) => {
                event.preventDefault();
                const incomeModal = App.getModal('newIncome');
                if (incomeModal) {
                    incomeModal.open();
                } else {
                    console.error('Модальное окно newIncome не найдено');
                }
            });
        } else {
            console.warn('Кнопка "Доход" не найдена');
        }

        if (newExpenseButton) {
            newExpenseButton.addEventListener('click', (event) => {
                event.preventDefault();
                const expenseModal = App.getModal('newExpense');
                if (expenseModal) {
                    expenseModal.open();
                } else {
                    console.error('Модальное окно newExpense не найдено');
                }
            });
        } else {
            console.warn('Кнопка "Расход" не найдена');
        }
    }
}

