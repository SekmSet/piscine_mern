const headers = new Headers();
headers.append('Content-Type', 'application/json');

const token = localStorage.getItem('token');
if (token) {
  headers.append('Authorization', 'Basic ' + token);
}

export async function fetchHome (setData) {
  const response = await fetch(
    'http://localhost:4242',
    {
      headers: headers,
    }
  );

  setData(await response.json());
}

