import React, { useState, useEffect } from 'react';
import Api from './api';
import { SimpleList, InputForm } from './components';

const App = () => {
  const api = new Api();
  const [rooms, setRooms] = useState();
  const loadRooms = async () => {
    const response = await api.getRooms();
    setRooms(response);
  }
  useEffect(() => {
    loadRooms();
    api.signup('hr');
    setInterval(() => {
      loadRooms();
    }, 3000);
  }, []);

  if (!rooms) {
    return <p>Loading</p>;
  }
  const items = rooms.map(({ name, usersCount }) => `${name} ${usersCount}`);
  const createRoom = async (name) => {
    await api.createRoom(name);
    loadRooms();
  }

  return (
    <div>
      <SimpleList items={items} />
      <InputForm label="채팅방입니다." onSubmit={createRoom}/>
    </div>
  );
}
export default App;

