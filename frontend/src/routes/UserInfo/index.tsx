import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { useAuth } from '../../context/useAuth';
import { User } from '../../types';

export const UserInfo = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${auth?.user?.accessToken}`,
      } as RawAxiosRequestHeaders,
    };

    axios
      .get(`http://localhost:3001/api/v1/users/${id}`, config)
      .then((res) => {
        setUserInfo(res.data);
      });
  }, []);

  return (
    <div>
      User Info
      {userInfo ? (
        <div>
          {Object.keys(userInfo).map((key) => (
            <div>{`${key}: ${userInfo[key as keyof typeof userInfo]}`}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
