import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export const SignIn = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.user) navigate(`/user/${auth?.user.userId}`);
  }, [auth?.user, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    auth?.login({ username, password });
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username: <input name="username" type="text" />
          </label>
        </div>
        <div>
          <label>
            Password: <input name="password" type="password" />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
