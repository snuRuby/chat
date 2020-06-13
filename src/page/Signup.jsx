import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';

import Api from '../api';
import { InputForm } from '../components';

const Signup = () => {
  const api = new Api();
  const [isLogin, setIsLogin] = useState(false);
  const signUp = async (name) => {
    await api.signup(name);
    const { success } = await api.login();
    if (success) {
      setIsLogin(true);
    }
  };
  return (
    <Box>
      {isLogin ? <Redirect to="/" /> : null}
      <InputForm label="Name" onSubmit={signUp} />
    </Box>
  );
};

export default Signup;
