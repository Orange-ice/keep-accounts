import {NextPage} from 'next';
import React from 'react';
import RegisterLogin from '../components/registerLogin';

const Register: NextPage = () => {
  const request = (data: { username: string, password: string }) => {

  };
  return (
    <RegisterLogin type={'register'} request={request}/>
  );
};

export default Register;