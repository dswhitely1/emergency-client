import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px auto`,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #dee236',
    borderRadius: theme.spacing(1),
    maxWidth: '100%',
    height: 'auto',
    verticalAlign: 'middle',
    padding: theme.spacing(0.5),
  },
}));

function Image({ src, alt }) {
  const classes = useStyles();
  return <img src={src} alt={alt} className={classes.root} />;
}

Image.defaultProps = {
  alt: '...',
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Image;
