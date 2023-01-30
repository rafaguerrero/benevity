import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

const error = (error, response = { status : 500 }) => {
  window.alert(`
    There was an error\n
    Status: ${response.status}
    Message: ${error.message}
  `) 
}

export default async (endpoint, method = 'get', body, authToken) => {
  const headers = { 'content-type': 'application/json' }

  if(authToken) headers['Authorization'] = authToken;

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    credentials: 'same-origin',
    body: JSON.stringify(body),
  })
  .then(response => 
      response.json()
        .then(json => ({ json, response }))
        .catch(() => ({ json: {}, response }))
  )
  .then(({ json, response }) => {
    if (!response.ok) {
      error(json, response);
      return Promise.reject(json);
    }

    return json;
  });
}
