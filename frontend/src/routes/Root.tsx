import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth, UserProvider } from '../context/UserContext';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { UserInfo } from './UserInfo';
import './root.css';

function Root() {
  return (
    <UserProvider>
      <div className="Root">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/user/:id"
            element={
              <RequireAuth>
                <UserInfo />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default Root;
