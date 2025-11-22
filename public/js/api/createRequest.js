/**
 * Основная функция для совершения запросов на сервер.
 */
const createRequest = (options = {}) => {
    const { url, method = 'GET', responseType = 'json', data, callback } = options;

    // Проверка наличия URL
    if (!url) {
        throw new Error('URL не должен быть пустым');
    }

    let requestUrl = url;
    let requestData = null;

    // Обработка данных в зависимости от метода
    if (data) {
        if (method === 'GET') {
            // Для GET запросов данные добавляем в URL как query параметры
            const params = new URLSearchParams();
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    params.append(key, data[key]);
                }
            }
            const queryString = params.toString();
            requestUrl = queryString ? `${url}?${queryString}` : url;
        } else {
            // Для POST/PUT/DELETE используем FormData
            const formData = new FormData();
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    formData.append(key, data[key]);
                }
            }
            requestData = formData;
        }
    }

    const xhr = new XMLHttpRequest();

    // Установка responseType
    xhr.responseType = responseType;

    // Установка времени ожидания запроса
    xhr.timeout = 10000;
    xhr.ontimeout = () => {
        callback('Запрос истек', null);
    };

    try {
        xhr.open(method, requestUrl);
    } catch (e) {
        callback(e, null);
        return;
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Обработка ответа в зависимости от responseType
                let response;
                try {
                    if (responseType === 'json') {
                        // Когда responseType = 'json', браузер автоматически парсит JSON
                        // и делает его доступным через xhr.response, а не xhr.responseText
                        response = xhr.response;
                    } else {
                        response = xhr.responseText;
                    }
                } catch (e) {
                    callback('Ошибка обработки ответа: ' + e.message, null);
                    return;
                }
                callback(null, response);
            } else {
                // Обработка ошибок статуса
                let errorResponse;
                try {
                    // Для ошибок также используем правильное свойство
                    if (responseType === 'json') {
                        errorResponse = xhr.response || { error: xhr.statusText || 'Ошибка' };
                    } else {
                        errorResponse = JSON.parse(xhr.responseText);
                    }
                } catch (e) {
                    errorResponse = { error: xhr.statusText || 'Ошибка' };
                }
                callback(errorResponse, null);
            }
        }
    };

    // Отправка данных
    try {
        xhr.send(requestData);
    } catch (e) {
        callback(e, null);
    }
};