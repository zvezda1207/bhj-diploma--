class LoginForm extends AsyncForm {

    /**
     * Производит авторизацию с помощью User.login
     * После успешной авторизации, сбрасывает форму,
     * устанавливает состояние App.setState('user-logged') и
     * закрывает окно, в котором находится форма
     */
    onSubmit(data) {
        User.login(data, (err, response) => {
            if (err) {
                console.error('Ошибка при авторизации:', err);
                return;
            }

            if (response && response.success && response.user) {
                App.setState('user-logged');
                this.element.reset();
                const modal = App.getModal('login');
                if (modal) modal.close();
            } else {
                console.error('Ошибка при авторизации:', response ? response.error : 'Неизвестная ошибка');
            }
        });
    }
}
