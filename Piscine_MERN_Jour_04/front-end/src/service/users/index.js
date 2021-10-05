const headers = new Headers();
headers.append('Content-Type', 'application/json');

const token = localStorage.getItem('token');
if (token) {
  headers.append('Authorization', 'Basic ' + token);
}

export async function fetchUsers (setData) {
  try {
    const response = await fetch(
      'http://localhost:4242/users',
      {
        headers: headers,
      }
    );

    setData(await response.json());
  } catch(e) {
    setData([]);
  }
}