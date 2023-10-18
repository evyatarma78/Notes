import React from 'react'
import LoginForm from './../../components/LoginForm';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function Login() {

  const { user } = useAuth();

  if(user) {
    return <Navigate to="/" />
  }
  return (
    <>
        <LoginForm/>
    </>
  )
}

export default Login