import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {useHistory, useParams} from 'react-router-dom';

import {fetchCreateBlog} from '../../service/blog/index';

const CreateBlog = () => {
  const [error, setError] = useState('');
  const { handleSubmit, register, errors } = useForm();
  const { login } = useParams();

  const history = useHistory();

  const onSubmit = async values => {
    const result = await fetchCreateBlog({
      login,
      title : values.title,
      resum: values.resum,
    });

    if (result.error) {
      setError(result.error);
    } else {
      history.push(`/${login}`);
      window.location.reload();
    }
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
        />
        {errors.title && errors.title.message}
        <textarea
          name="resum"
          ref={register({
            required: 'Required',
          })}
        >

        </textarea>
        {errors.resum && errors.resum.message}

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};
export default CreateBlog;
