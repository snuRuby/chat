import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Link, Typography } from '@material-ui/core';

import Api from './api';
import { SimpleList, InputForm } from './components';

const App = () => {
  const api = new Api();
  const [rooms, setRooms] = useState();
  const [user, setUser] = useState();
  const loadRooms = async () => {
    const response = await api.getRooms();
    setRooms(response);
  }
  useEffect(() => {
    loadRooms();
    api.login().then(({ name, success }) => success ? setUser(name) : null);
    setInterval(() => {
      loadRooms();
    }, 3000);
  }, []);

  if (!rooms) {
    return <CircularProgress />;
  }
  const items = rooms.map(({ name, usersCount }) => `${name} ${usersCount}`);
  const createRoom = async (name) => {
    await api.createRoom(name);
    loadRooms();
  }

  return (
    <Box>
      {user
      ? <Button color="primary" variant="contained">Create Room</Button>
      : <Link component="button">Login</Link>}
      <Typography variant="h5">Create Room</Typography>
      <InputForm label="Room Name" onSubmit={createRoom}/>
      <Typography variant="h5">Room List</Typography>
      <SimpleList items={items} />
    </Box>
  );
}
export default App;
