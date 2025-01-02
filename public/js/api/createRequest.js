/**
 * Основная функция для совершения запросов на сервер.
 */
const createRequest = (options = {}) => {
    const { url, method = 'GET', responseType = 'json', data, callback } = options;

    // Проверка наличия URL
    if (!url) {
        throw new Error('URL не должен быть пустым');
    }

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    // Установка заголовка Content-Type только если есть данные для отправки
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }

    // Установка времени ожидания запроса
    xhr.timeout = 10000; // Устанавливаем 10 секунд
    xhr.ontimeout = () => {
        callback('Запрос истек', null);
    };

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Обработка ответа в зависимости от responseType
                let response;
                try {
                    response = responseType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                } catch (e) {
                    callback('Ошибка обработки ответа: ' + e.message, null);
                    return;
                }
                callback(null, response); // Успешное выполнение
            } else {
                // Обработка ошибок статуса
                callback(xhr.statusText || 'Ошибка', null);
            }
        }
    };

    // Отправка данных, если они есть
    xhr.send(data ? JSON.stringify(data) : null);
};