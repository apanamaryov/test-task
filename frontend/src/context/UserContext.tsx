import React, { createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios, {
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { useAuth } from './useAuth';

interface LoginCredentials {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
}

interface User {
  userId: string;
  accessToken: string;
}

interface UserContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: LoginCredentials) => {
    const config: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json',
      } as RawAxiosRequestHeaders,
    };

    const response: AxiosResponse = await axios.post(
      'http://localhost:3001/api/v1/users/signIn',
      credentials,
      config,
    );

    setUser(response.data);
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();

  if (!auth?.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
