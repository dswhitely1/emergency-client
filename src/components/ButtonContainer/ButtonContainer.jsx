import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    margin: theme.spacing(3, 0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  form: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 16,
  },
}));

function ButtonContainer({ form, children, ...rest }) {
  const classes = useStyles();
  const buttonContainerClasses = cx({
    [classes.buttonContainer]: true,
    [classes.form]: form,
  });

  return (
    <div className={buttonContainerClasses} {...rest}>
      {children}
    </div>
  );
}

ButtonContainer.propTypes = {
  children: PropTypes.node.isRequired,
  form: PropTypes.bool,
};

export default ButtonContainer;
