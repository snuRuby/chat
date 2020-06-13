import React from 'react';
import {
  Box, List, ListItem, ListItemText,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const SimpleList = ({ items }) => (
  <Box width={500}>
    <List>
      {items.map((item, idx) => (
        // add onClick
        <ListItem button divider key={+idx}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  </Box>
);

SimpleList.propTypes = {
  items: PropTypes.string.isRequired,
};

export default SimpleList;
