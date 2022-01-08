import {NextPage} from 'next';
import React from 'react';
import RegisterLogin from '../components/registerLogin';

const Login: NextPage = () => {
  return (
    <RegisterLogin type={'login'} requestUrl="/api/v1/user/login"/>
  );
};

export default Login;