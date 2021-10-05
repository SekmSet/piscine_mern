const jwtDecode = require('jwt-decode');
const headers = new Headers();
headers.append('Content-Type', 'application/json');

const token = localStorage.getItem('token');
if (token) {
  headers.append('Authorization', 'Basic ' + token);
}


export async function fetchLogin (login, password) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({login, password})
  };

  const response = await fetch(
    'http://localhost:4242/login', requestOptions
  );

  return await response.json();
}

export function isAuthenticated () {
  return (token);
}

export function getCurentUser () {
  if (!isAuthenticated()) {
    return false;
  }

  return jwtDecode(token);
}