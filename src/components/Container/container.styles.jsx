import { makeStyles } from '@material-ui/core/styles';

const useContainerStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '85vh',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  top: {
    marginTop: theme.spacing(8),
  },
  description: {
    width: '83%',
  },
}));

export default useContainerStyles;
