import FingerPrint from '@material-ui/icons/Fingerprint';
import PersonAdd from '@material-ui/icons/PersonAdd';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const loggedOutRoutes = [
  {
    path: '/register',
    name: 'Register Page',
    icon: PersonAdd,
    component: RegisterPage,
    layout: '/now-hiring',
  },
  {
    path: '/login',
    name: 'Login Page',
    icon: FingerPrint,
    component: LoginPage,
    layout: '/now-hiring',
  },
];

export default loggedOutRoutes;
