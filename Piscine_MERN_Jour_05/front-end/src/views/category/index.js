import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {fetchCreateCategory} from '../../service/category/index';
import {useForm} from 'react-hook-form';

const CategoriePage = () => {
  const { handleSubmit, register } = useForm();
  const history = useHistory();

  const onSubmit = async values => {
    await fetchCreateCategory(values.name);
    history.push('/category');
    window.location.reload();
  };

  return (
    <div>
      <h3>Catégories</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          ref={register({})}
        />
        <button type="submit">Créer</button>
      </form>

      <hr/>


    </div>
  );
};
export default CategoriePage;
