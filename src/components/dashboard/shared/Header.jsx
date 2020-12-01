import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
  },
}));

function Header({ title, url }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5">{`${title} List`}</Typography>
      <Button
        color="primary"
        component={RouterLink}
        to={url}
      >{`Add New ${title}`}</Button>
    </Paper>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Header;
