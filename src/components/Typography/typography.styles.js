import { makeStyles } from '@material-ui/core/styles';

const useTypographyStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  header: {
    fontWeight: 'bolder',
  },
  spacing: {
    paddingTop: theme.spacing(4),
  },
  noMargin: {
    margin: 0,
  },
  title: {
    textTransform: 'uppercase',
    margin: theme.spacing(2, 0),
  },
  top: {
    marginTop: theme.spacing(2),
  },
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
  },
  right: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}));

export default useTypographyStyles;
