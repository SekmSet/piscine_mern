const headers = new Headers();
headers.append('Content-Type', 'application/json');

const token = localStorage.getItem('token');
if (token) {
  headers.append('Authorization', 'Basic ' + token);
}

// DELETE BLOG
export async function fetchDelete(login, id) {
  const requestOptions = {
    method: 'DELETE',
    headers: headers,
  };

  const response = await fetch(
    `http://localhost:4242/${login}/${id}`, requestOptions
  );

  return await response.json();
}

export async function fetchMyBlogs(setData, login) {
  const response = await fetch(
    `http://localhost:4242/${login}`,
    {
      headers: headers,
    }
  );

  setData(await response.json());
}

// READ ALL
export async function fetchBlogs(setData) {
  const response = await fetch(
    'http://localhost:4242/all',
    {
      headers: headers,
    }
  );

  setData(await response.json());
}

// READ ONE
export async function fetchBlog(setData, login, id) {
  const response = await fetch(
    `http://localhost:4242/${login}/${id}`,
    {
      headers: headers,
    }
  );

  setData(await response.json());
}

// CREATE
export async function fetchCreateBlog({ login, title, resum }) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ title, resum })
  };

  const response = await fetch(
    `http://localhost:4242/${login}`, requestOptions
  );

  return await response.json();
}

// UPDATE
export async function fetchUpdateBlog({ login, id, title, resum }) {
  const requestOptions = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ title, resum })
  };

  const response = await fetch(
    `http://localhost:4242/${login}/${id}`, requestOptions
  );

  return await response.json();
}

// CREATE
export async function fetchCreateComment({ login, idBlog, body }) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ body })
  };

  const response = await fetch(
    `http://localhost:4242/${login}/${idBlog}/comment`, requestOptions
  );

  return await response.json();
}

// DELETE COMMENT

export async function deleteCom({ login, idBlog, commentId }) {
  const requestOptions = {
    method: 'DELETE',
    headers: headers,
  };

  const response = await fetch(
    `http://localhost:4242/${login}/${idBlog}/comment/${commentId}`, requestOptions
  );

  return await response.json();
}