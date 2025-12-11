import React from 'react';
import { Hearts } from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  spinner: {
    padding: theme.spacing(2),
    height: '81vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Spinner() {
  const classes = useStyles();
  return (
    <Hearts
      height={300}
      width={300}
      className={classes.spinner}
      color="#670300"
    />
  );
}

export default Spinner;
