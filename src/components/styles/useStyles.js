import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRows: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: theme.spacing(1, 0),
    },
  },
  two: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'calc(50% - 10px)',
    },
  },
  three: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'calc(33% - 10px)',
    },
  },
  four: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'calc(25% - 10px)',
    },
  },
  one: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'calc(75% - 10px)',
    },
  },
  middleContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appSpacing: {
    margin: theme.spacing(2, 0),
  },
  mobileSpacing: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}));
