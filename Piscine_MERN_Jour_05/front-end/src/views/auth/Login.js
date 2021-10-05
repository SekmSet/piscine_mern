import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import {fetchLogin} from '../../service/auth/login';

const LoginPage = () => {
  const [error, setError] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const history = useHistory();

  const onSubmit = async values => {
    const result = await fetchLogin(values.login, values.password);
    if (result.error) {
      setError(result.error);
      return;
    }

    localStorage.setItem('token', result.token);
    history.push('/');
    window.location.reload();
  };

  return (
    <div>
      {error !== '' && error}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="login"
          ref={register({
            required: 'Required',
          })}
        />
        {errors.login && errors.login.message}

        <input
          name="password"
          type="password"
          ref={register({
            required: 'Required',
          })}
        />
        {errors.password && errors.password.message}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPage;
