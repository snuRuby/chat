import {
  Box, Button, CircularProgress, Typography,
} from '@material-ui/core';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';

import Api from './api';
import { SimpleList, InputForm } from './components';

const App = () => {
  const api = useMemo(() => new Api(), []);
  const [rooms, setRooms] = useState();
  const [user, setUser] = useState();
  const loadRooms = useCallback(async () => {
    const response = await api.getRooms();
    setRooms(response);
  }, [api]);
  useEffect(() => {
    loadRooms();
    api.login().then(({ name, success }) => (success ? setUser(name) : null));
    setInterval(() => {
      loadRooms();
    }, 3000);
  }, [api, loadRooms]);

  if (!rooms) {
    return <CircularProgress />;
  }
  const items = rooms.map(({ name, usersCount }) => `${name} ${usersCount}`);
  const createRoom = async (name) => {
    await api.createRoom(name);
    loadRooms();
  };

  return (
    <Box>
      {user
        ? <Button color="primary" variant="contained">Create Room</Button>
        : <Button component={Link} to="/">Login</Button>}
      <Typography variant="h5">Create Room</Typography>
      <InputForm label="Room Name" onSubmit={createRoom} />
      <Typography variant="h5">Room List</Typography>
      <SimpleList items={items} />
    </Box>
  );
};
export default App;
