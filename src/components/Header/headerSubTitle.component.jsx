import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '../Typography/typography.component';

const useHeaderSubTitleStyles = makeStyles((theme) => ({
  start: {
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
  },
  noPadding: {
    padding: 0,
  },
}));

function HeaderSubTitle({ titles, flexPosition, noPadding, ...rest }) {
  const classes = useHeaderSubTitleStyles();
  const listItemClasses = clsx({
    [classes[flexPosition]]: flexPosition,
    [classes.noPadding]: noPadding,
  });
  const listClasses = clsx({
    [classes.noPadding]: noPadding,
  });
  return (
    <List className={listClasses}>
      {titles.map((title, key) => (
        <ListItem key={key} className={listItemClasses} disableGutters>
          <Typography {...rest}>{title}</Typography>
        </ListItem>
      ))}
    </List>
  );
}

HeaderSubTitle.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  flexPosition: PropTypes.oneOf(['start', 'center', 'end']),
  noPadding: PropTypes.bool,
};

export default HeaderSubTitle;
