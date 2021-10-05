import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {useHistory, useParams} from 'react-router-dom';

import {fetchCreateBlog} from '../../service/blog/index';
import {fetchCategories} from '../../service/category/index';

const CreateBlog = () => {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const { handleSubmit, register, errors } = useForm();
  const { login } = useParams();

  const history = useHistory();

  useEffect(( ) =>{
    fetchCategories(setCategories);
  }, []);


  const onSubmit = async values => {
    const result = await fetchCreateBlog({
      login,
      title : values.title,
      resum: values.resum,
      categories : values.categories
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

        <div className="form-group">
          <label htmlFor="categories">Catégorie/s</label>
          <select multiple className="form-control" id="categories"  name="categories" ref={register({ required: 'Required'})}>
            {categories.map((category)=>(
              <option key={category._id} value={category._id}>{category.name }</option>
            ))}
          </select>
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};
export default CreateBlog;
