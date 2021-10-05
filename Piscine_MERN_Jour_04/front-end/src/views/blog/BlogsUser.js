import React, {useEffect, useState} from 'react';
import {
  Link,
  useParams
} from 'react-router-dom';
import {fetchMyBlogs} from '../../service/blog/index';

const BlogsPage = () => {
  const { login } = useParams();
  const [data, setData] = useState([]);
  useEffect(() =>{
    fetchMyBlogs(setData, login);
  }, [login]);

  return (
    <div>
      <h3>Blog de {login}</h3>
      <hr/>
      { data.map((blog) => (
        <div key={blog._id}>
          <h3>
            {blog.title}
          </h3>
          <Link className="nav-link" to={`/${login}/${blog._id}`}>Plus</Link>
        </div>
      ))}

    </div>
  );
};
export default BlogsPage;
