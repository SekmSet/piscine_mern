import React from 'react';
import { useForm } from 'react-hook-form';
import {fetchCreateComment} from '../service/blog';

const CommentAdd = ({login, blog, setBlog, user}) => {
  const { handleSubmit, register, errors } = useForm();


  const onSubmit = async values => {
    const result = await fetchCreateComment({
      login,
      idBlog: blog._id,
      body : values.body,
    });

    setBlog(result);
  };

  if (blog.user && blog.user._id === user._id) {
    return null;
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <textarea
      name="body"
      ref={register({
        required: 'Required',
      })}
    />
    {errors.body && errors.body.message}

    <button type="submit">Ajouter</button>
  </form>;
};

export default CommentAdd;