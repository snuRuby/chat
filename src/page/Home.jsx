import { Box, Button } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Api from '../api';
import { RoomList } from '../components';

const Home = () => {
  const api = useMemo(() => new Api(), []);
  const [user, setUser] = useState();
  useEffect(() => {
    api.login().then(({ name, success }) => (success ? setUser(name) : null));
  }, [api]);

  return (
    <Box>
      {user
        ? null
        : <Button color="primary" component={Link} to="/signup" variant="contained">Sign up</Button>}
      <RoomList auth={!!user} />
    </Box>
  );
};
export default Home;
