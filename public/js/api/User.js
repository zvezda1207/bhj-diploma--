/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    console.log('Установка текущего пользователя:', user); // Логируем текущего пользователя
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    console.log('Сброс текущего пользователя'); // Логируем сброс пользователя
    localStorage.removeItem('currentUser');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    console.log('Сброс текущего пользователя'); // Логируем сброс пользователя
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    console.log('Сброс текущего пользователя'); // Логируем сброс пользователя
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: (err, response) => {
        console.log('Ответ от сервера для текущего пользователя:', response); // Логируем ответ
          callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    console.log('Запрос на вход с данными:', data); // Логируем данные для входа
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback: (err, response) => {
        console.log('Ответ от сервера на запрос входа:', response); // Логируем ответ на вход
          if (response && response.user) {
              this.setCurrent(response.user);
          }
          callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    console.log('Запрос на регистрацию с данными:', data); // Логируем данные для регистрации
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data,
      callback: (err, response) => {
        console.log('Ответ от сервера на запрос регистрации:', response); // Логируем ответ на регистрацию
          if (response && response.user) {
              this.setCurrent(response.user);
          }
          callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    console.log('Запрос на выход'); // Логируем запрос на выход
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        console.log('Ответ от сервера на запрос выхода:', response); // Логируем ответ на выход
          if (!err) {
              this.unsetCurrent();
          }
          callback(err, response);
      }
    });
  }  
}
