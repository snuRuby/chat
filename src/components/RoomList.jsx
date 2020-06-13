import {
  Box, CircularProgress, Typography,
} from '@material-ui/core';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

import Api from '../api';
import SimpleList from './SimpleList';
import InputForm from './InputForm';

const RoomList = ({ auth }) => {
  const api = useMemo(() => new Api(), []);
  const [rooms, setRooms] = useState();
  const loadRooms = useCallback(async () => {
    const response = await api.getRooms();
    setRooms(response);
  }, [api]);
  useEffect(() => {
    loadRooms();
  }, [api, loadRooms]);

  const CreateRoom = () => {
    const createRoom = async (name) => {
      await api.createRoom(name);
      await loadRooms();
    };
    return (
      <Box>
        <Typography variant="h5">Create Room</Typography>
        <InputForm label="Room Name" onSubmit={createRoom} />
      </Box>
    );
  };

  if (!rooms) {
    return <CircularProgress />;
  }
  const items = rooms.map(({ name, usersCount }) => `${name} ${usersCount}`);

  return (
    <Box>
      {auth ? <CreateRoom /> : null}
      <Typography variant="h5">Room List</Typography>
      <SimpleList items={items} />
    </Box>
  );
};
export default RoomList;

RoomList.propTypes = {
  auth: PropTypes.bool.isRequired,
};
