import {
  Box, Button, Typography,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Api from '../api';
import { RoomList, InputForm } from '../components';

const Home = () => {
  const api = useMemo(() => new Api(), []);
  const [user, setUser] = useState();
  console.log(user);
  useEffect(() => {
    api.login().then(({ name, success }) => (success ? setUser(name) : null));
  }, [api]);
  const createRoom = async (name) => {
    await api.createRoom(name);
  };

  const CreateRoom = () => (
    <Box>
      <Typography variant="h5">Create Room</Typography>
      <InputForm label="Room Name" onSubmit={createRoom} />
    </Box>
  );

  return (
    <Box>
      {user
        ? <CreateRoom />
        : <Button color="primary" component={Link} to="/signup" variant="contained">Sign up</Button>}
      <RoomList />
    </Box>
  );
};
export default Home;
