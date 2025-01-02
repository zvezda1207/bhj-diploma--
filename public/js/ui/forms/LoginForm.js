class LoginForm extends AsyncForm {

    /**
     * Производит авторизацию с помощью User.login
     * После успешной авторизации, сбрасывает форму,
     * устанавливает состояние App.setState('user-logged') и
     * закрывает окно, в котором находится форма
     */
    onSubmit(data) {
        // Данные для логина извлекаем из параметра data
        console.log('Данные для логина:', data); // Логирование данных для проверки

        User.login(data, (err, response) => {
            if (err) {
                console.error('Ошибка при авторизации:', err);
                return; 
            }

            console.log('Ответ от сервера:', response); // Логируем ответ от сервера
            
            if (response && response.user) {
                App.setState('user-logged'); // Устанавливаем состояние, что пользователь залогинен
                this.element.reset(); // Сбрасываем форму
                const modal = App.getModal('login'); // Получаем модальное окно
                if (modal) modal.close(); // Закрываем модальное окно
            } else {
                console.error('Ошибка при авторизации:', response.error || 'Неизвестная ошибка');
            }
        });
    }
}
