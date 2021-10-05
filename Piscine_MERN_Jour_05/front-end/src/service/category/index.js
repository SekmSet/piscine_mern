const headers = new Headers();
headers.append('Content-Type', 'application/json');

const token = localStorage.getItem('token');
if (token) {
  headers.append('Authorization', 'Basic ' + token);
}

// CREATE
export async function fetchCreateCategory (name) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({name})
  };

  const response = await fetch(
    'http://localhost:4242/category/add', requestOptions
  );

  return await response.json();
}

// READ ALL CATEGORIES
export async function fetchCategories (setCategories) {
  const requestOptions = {
    method: 'GET',
    headers: headers,
  };

  const response = await fetch(
    'http://localhost:4242/category', requestOptions
  );

  setCategories(await response.json());
}
