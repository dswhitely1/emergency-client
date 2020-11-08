import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/CustomCards/Card';
import CardHeader from 'components/CustomCards/CardHeader';
import Button from 'components/CustomButtons/Button';
import CardBody from 'components/CustomCards/CardBody';
import CustomInput from 'components/CustomInput/CustomInput';
import { Icon, InputAdornment } from '@material-ui/core';
import { Face } from '@material-ui/icons';
import CardFooter from 'components/CustomCards/CardFooter';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.customTheme.container,
    zIndex: 4,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 100,
    },
  },
  cardTitle: {
    ...theme.customTheme.cardTitle,
    color: theme.palette.common.white,
  },
  textCenter: {
    textAlign: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: theme.palette.common.white,
    },
    marginLeft: 5,
    marginRight: 5,
  },
  inputAdornment: {
    marginRight: 18,
  },
  inputAdornmentIcon: {
    color: '#555555',
  },
  cardHidden: {
    opacity: 0,
    transform: 'translate3d(0,-60px,0)',
  },
  cardHeader: {
    marginBottom: 20,
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
}));

function LoginPage(props) {
  const classes = useStyles();
  const [cardAnimation, setCardAnimation] = useState('cardHidden');

  useEffect(() => {
    const id = setTimeout(() => {
      setCardAnimation('');
    }, 700);
    return () => {
      window.clearTimeout(id);
    };
  });

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimation]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="secondary"
              >
                <h4 className={classes.cardTitle}>Log In</h4>
                <div className={classes.socialLine}>
                  {[
                    'fab fa-facebook-square',
                    'fab fa-twitter',
                    'fab fa-google-plus',
                  ].map((name, key) => (
                    <Button
                      color="transparent"
                      justIcon
                      key={key}
                      className={classes.customButtonClass}
                    >
                      <i className={name} />
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Username..."
                  id="username"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Password..."
                  id="password"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: 'password',
                    autoComplete: 'off',
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="secondary" simple size="lg" block>
                  Lets Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default LoginPage;
