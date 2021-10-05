import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Link,
  useParams
} from 'react-router-dom';
import {fetchBlog, fetchDelete} from '../../service/blog/index';
import CommentAdd from '../../components/commentAdd';
import {getCurentUser } from '../../service/auth/login';
import {deleteCom} from '../../service/blog';


const BlogPage = () => {
  const { login, id } = useParams();
  const [blog, setBlog] = useState({});
  const history = useHistory();
  const user = getCurentUser();

  useEffect(() => {
    fetchBlog(setBlog, login, id);
  }, [login, id]);

  const handleDelete = async () => {
    console.log('ttt');
    await fetchDelete(login, id);
    history.push(`/${login}`);
  };

  const deleteComment = async (commentId) => {
    const deleteResponse = await deleteCom({login, commentId, idBlog : blog._id});
    setBlog(deleteResponse);
  };

  return (
    <div>
      { blog._id && (
        <div>
          <h3>
            {blog.title}
          </h3>
          <p>  {blog.resum}</p>
          <small>{blog.user.login}</small>
        </div>
      )}

      {blog.categories && blog.categories.map((category)=>(
        <span  key={category._id}  className="badge badge-pill badge-info">{category.name}</span>
      ))}

      {blog.user && blog.user._id === user._id && (
        <div>
          <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
          <Link className="nav-link" to={`/${login}/${blog._id}/update`}>Modifier</Link>
        </div>
      )}

      <hr />

      <h4>Commentaires</h4>

      { blog.comments && blog.comments.map((comment) => (
        <div key={comment._id}>
          <strong>
            {comment.body}
          </strong><br/>
          <small>{comment.user && comment.user.login}</small>
          <br/>

          {blog.user && blog.user._id === user._id && (
            <button className="btn btn-danger" onClick={() => deleteComment(comment._id)}>X</button>
          )}
          <hr/>
        </div>
      ))}

      <CommentAdd login={login} blog={blog} setBlog={setBlog} user={user} />
    </div>
  );
};
export default BlogPage;
