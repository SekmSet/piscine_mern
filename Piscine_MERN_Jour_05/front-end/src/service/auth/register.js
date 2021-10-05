const headers = new Headers();
headers.append('Content-Type', 'application/json');

const token = localStorage.getItem('token');
if (token) {
  headers.append('Authorization', 'Basic ' + token);
}


export async function fetchRegister ({login, email, password, passwordConfirm }) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({login, email, password, passwordConfirm })
  };

  const response = await fetch(
    'http://localhost:4242/register', requestOptions
  );

  return await response.json();
}
