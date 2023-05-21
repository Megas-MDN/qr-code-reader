import GoRegister from '@/components/GoRegister';
import React from 'react';

const Register = () => {
  const baseUrl = process.env.URL_BASE_BACK;
  return <GoRegister {...{ baseUrl }} />;
};

export default Register;
