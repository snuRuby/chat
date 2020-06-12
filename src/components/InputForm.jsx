import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';

const InputForm = ({ label, onSubmit }) => {
  const [input, setInput] = useState('');
  return (
    <Box>
      <TextField label={label} onChange={({ target: { value } }) => setInput(value)} value={input} />
      <Button color="primary" onClick={() => onSubmit(input)} variant="contained">create</Button>
    </Box>
  );
}

export default InputForm;
