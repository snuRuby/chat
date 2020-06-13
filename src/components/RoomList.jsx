import {
  Box, CircularProgress, Typography,
} from '@material-ui/core';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import Api from '../api';
import SimpleList from './SimpleList';

const RoomList = () => {
  const api = useMemo(() => new Api(), []);
  const [rooms, setRooms] = useState();
  const loadRooms = useCallback(async () => {
    const response = await api.getRooms();
    setRooms(response);
  }, [api]);
  useEffect(() => {
    loadRooms();
    setInterval(() => {
      loadRooms();
    }, 3000);
  }, [api, loadRooms]);

  if (!rooms) {
    return <CircularProgress />;
  }
  const items = rooms.map(({ name, usersCount }) => `${name} ${usersCount}`);

  return (
    <Box>
      <Typography variant="h5">Room List</Typography>
      <SimpleList items={items} />
    </Box>
  );
};
export default RoomList;
