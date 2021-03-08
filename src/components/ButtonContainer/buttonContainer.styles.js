import { makeStyles } from '@material-ui/core';

const useButtonContainerStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
  },
}));

export default useButtonContainerStyles;
