/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(callback) {
    createRequest({
        url: this.URL,
        method: 'GET',
        callback: (err, response) => {
            callback(err, response);
        }
    });
}

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
        url: this.URL,
        method: 'POST',
        data,
        callback: (err, response) => {
            callback(err, response);
        }
    });
}

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback) {
    createRequest({
        url: this.URL + '/' + data.id,
        method: 'DELETE',
        callback: (err, response) => {
            callback(err, response);
        }
    });
  }
}
