import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

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
      <Button color="primary" component={RouterLink} to={url}>
        {`Add New ${title}`}
      </Button>
    </Paper>
  );
}

export default Header;
