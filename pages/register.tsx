import {NextPage} from 'next';
import React from 'react';
import RegisterLogin from '../components/registerLogin';

const Register: NextPage = () => {
  return (
    <RegisterLogin type={'register'} requestUrl="/api/v1/user/register"/>
  );
};

export default Register;