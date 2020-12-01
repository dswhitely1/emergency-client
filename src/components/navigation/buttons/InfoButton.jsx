import React from 'react';
import { Button, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  infoButton: {
    marginRight: theme.spacing(1),
  },
}));

function InfoButton({ color, value, name, url }) {
  const classes = useStyles();
  return (
    <Badge color={color} badgeContent={value} className={classes.infoButton}>
      <Button color="inherit" component={RouterLink} to={url}>
        {name}
      </Button>
    </Badge>
  );
}

InfoButton.propTypes = {
  color: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default InfoButton;
