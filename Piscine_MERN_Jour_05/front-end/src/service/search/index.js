const headers = new Headers();
headers.append('Content-Type', 'application/json');

const token = localStorage.getItem('token');
if (token) {
  headers.append('Authorization', 'Basic ' + token);
}

export async function fetchSearch (searchByTitle, searchByResum) {
  const requestOptions = {
    method: 'GET',
    headers: headers,
  };
  const response = await fetch(
    `http://localhost:4242/search?searchByTitle=${searchByTitle}&searchByResum=${searchByResum}`, requestOptions
  );

  return await response.json();
}

