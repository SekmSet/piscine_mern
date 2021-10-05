import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import {fetchRegister} from '../../service/auth/register';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const history = useHistory();

  const onSubmit = async values => {
    const result = await fetchRegister({
      login : values.login,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    history.push('/login');
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
          name="email"
          type="email"
          ref={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          })}
        />
        {errors.email && errors.email.message}

        <input
          name="password"
          type="password"
          ref={register({
            required: 'Required',
          })}
        />
        {errors.password && errors.password.message}

        <input
          name="passwordConfirm"
          type="password"
          ref={register({
            required: 'Required',
          })}
        />
        {errors.passwordConfirm && errors.passwordConfirm.message}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default RegisterPage;
