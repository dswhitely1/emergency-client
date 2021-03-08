import { makeStyles } from '@material-ui/core/styles';
import headerImage from '../../assests/electrical-electrician-electricity-1435183.jpg';

const useSectionStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(16, 0),
  },
  header: {
    minHeight: '30rem',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    background: `linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 100%), url(${headerImage})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
  },
  inverted: {
    backgroundColor: '#351a1a',
    color: '#b48a66',
  },
}));

export default useSectionStyles;
