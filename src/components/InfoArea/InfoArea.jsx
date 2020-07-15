import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  infoArea: {
    maxWidth: 360,
    margin: '0 auto',
    padding: 0,
  },
  iconWrapper: {
    float: 'left',
    marginTop: 24,
    marginRight: 10,
  },
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  danger: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  info: {
    color: theme.palette.info.main,
  },
  gray: {
    color: '#999',
  },
  icon: {
    width: 36,
    height: 36,
  },
  descriptionWrapper: {
    color: '#999',
    overflow: 'hidden',
  },
  title: {
    color: '#3c4858',
    margin: theme.spacing(4, 0, 2),
    textDecoration: 'none',
    fontSize: 18,
  },
  description: {
    color: '#999',
    overflow: 'hidden',
    marginTop: 0,
    fontSize: 14,
  },
}));

function InfoArea({ title, description, icon: InfoIcon, iconColor }) {
  const classes = useStyles();
  const iconClassNames = cx({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: iconColor,
  });

  return (
    <div className={classes.infoArea}>
      <div className={iconClassNames}>
        <InfoIcon className={classes.icon} />
      </div>
      <div className={classes.descriptionWrapper}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: 'gray',
};

InfoArea.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    'primary',
    'secondary',
    'warning',
    'danger',
    'success',
    'info',
    'gray',
  ]),
};

export default InfoArea;
