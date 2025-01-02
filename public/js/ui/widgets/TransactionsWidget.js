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
    // Находим кнопки для создания новых доходов и расходов
        const newIncomeButton = document.querySelector('#transactions-widget .new-income'); 
        const newExpenseButton = document.querySelector('#transactions-widget .new-expense');


        if (newIncomeButton) {
            newIncomeButton.addEventListener('click', (event) => {
                event.preventDefault();
                const incomeModal = App.getModal('newIncome'); // Убедитесь, что имя совпадает с data-modal-id
                if (incomeModal) {
                    incomeModal.open();
                } else {
                    console.error('Modal for income not found');
                }
            });
        } else {
            console.warn('Кнопка "Новый доход" не найдена');
        }

        if (newExpenseButton) {
            newExpenseButton.addEventListener('click', (event) => {
                event.preventDefault();
                const expenseModal = App.getModal('newExpense');
                if (expenseModal) {
                    expenseModal.open();
                } else {
                    console.error('Modal for expense not found');
                }
            });
        } else {
            console.warn('Кнопка "Новый расход" не найдена');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const transactionsWidget = document.getElementById('transactions-widget');
    if (transactionsWidget) {
        new TransactionsWidget(transactionsWidget);
    } else {
        console.error('Элемент transactions-widget не найден');
    }
});
