import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useImageStyles = makeStyles(() => ({
  root: {
    padding: '0.25rem',
    backgroundColor: '#fff',
    border: '1px solid #dee236',
    borderRadius: '1rem',
    maxWidth: '100%',
    height: 'auto',
    verticalAlign: 'middle',
    margin: '16px auto',
  },
}));
function Image({ ...rest }) {
  const classes = useImageStyles();
  // eslint-disable-next-line
  return <img className={classes.root} {...rest} />;
}

export default Image;
