const createRequest = (options = {}) => {
  const {
    headers, data, responseType, method, callback,
  } = options;
  const url = new URL('https://ahj-7-1.herokuapp.com');

  if (method === 'GET') {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        url.searchParams.set(key, data[key]);
      }
    }
  }

  const request = new XMLHttpRequest();

  try {
    request.open(method, url);
    for (const header in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, header)) {
        request.setRequestHeader(header, headers[header]);
      }
    }
    request.responseType = responseType;

    if (method === 'GET') {
      request.send();
    } else {
      const formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          formData.append(key, data[key]);
        }
      }
      request.send(formData);
    }
  } catch (e) {
    alert(e);
  }

  request.addEventListener('load', () => {
    if (request.status === 200) {
      callback(request.response);
    } else {
      alert(`Ошибка ${request.status}\n${request.statusText}`);
    }
  });

  request.addEventListener('error', () => {
    alert('Нет связи с сервером');
  });
};

export default createRequest;
