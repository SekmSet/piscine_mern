import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {useHistory, useParams} from 'react-router-dom';

import {fetchBlog, fetchUpdateBlog} from '../../service/blog/index';

const UpdateBlog = () => {
  const [blog, setBlog] = useState({});
  const [error, setError] = useState('');
  const { handleSubmit, register, errors } = useForm();
  const { login, id} = useParams();

  const history = useHistory();

  useEffect(() =>{
    fetchBlog(setBlog, login, id);
  }, [login, id]);

  const onSubmit = async values => {
    const result = await fetchUpdateBlog({
      login,
      id,
      title : values.title,
      resum: values.resum,
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    console.log(result);
    history.push(`/${login}`);
    window.location.reload();
  };

  return (
    <div>
      {error !== '' && error}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="title"
          ref={register({
            required: 'Required',
          })}
          defaultValue={blog.title}
        />
        {errors.title && errors.title.message}
        <textarea
          name="resum"
          ref={register({
            required: 'Required',
          })}
          defaultValue={blog.resum}
        >

        </textarea>
        {errors.resum && errors.resum.message}

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};
export default UpdateBlog;
