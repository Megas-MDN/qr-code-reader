import GoLogin from '@/components/GoLogin';
import { useZusStore } from '@/store/store';
import React from 'react';

const Login = () => {
  const baseUrl = process.env.URL_BASE_BACK;
  return <GoLogin {...{ baseUrl }} />;
};

export default Login;
