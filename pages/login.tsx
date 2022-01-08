import {NextPage} from 'next';
import React from 'react';
import RegisterLogin from '../components/registerLogin';

const Login: NextPage = () => {
  const request = (data: { username: string, password: string }) => {

  };
  return (
    <RegisterLogin type={'login'} request={request}/>
  );
};

export default Login;