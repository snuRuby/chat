import React from 'react';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';

const SimpleList = ({ items }) => {
  return (
    <Box width={500}>
      <List>
        {items.map((item, idx) => (
          // add onClick
          <ListItem button divider key={idx}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SimpleList;