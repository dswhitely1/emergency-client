import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'hooks/useForm';
import Timeline from '@material-ui/icons/Timeline';
import Code from '@material-ui/icons/Code';
import Group from '@material-ui/icons/Group';
import Face from '@material-ui/icons/Face';
import Lock from '@material-ui/icons/LockOutlined';
import { hexToRgb } from 'utils/utilities';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/CustomCards/Card';
import { InputAdornment, Typography } from '@material-ui/core';
import CardBody from 'components/CustomCards/CardBody';
import InfoArea from 'components/InfoArea/InfoArea';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import cx from 'classnames';

const title = {
  color: '#3c4858',
  textDecoration: 'none',
  fontWeight: 300,
  marginTop: 30,
  marginBottom: 35,
  minHeight: 32,
  '& small': {
    color: '#777',
    fontSize: '65%',
    fontWeight: 400,
    lineHeight: 1,
  },
};

const cardTitle = {
  ...title,
  marginTop: 0,
  marginBottom: 3,
  minHeight: 'auto',
  '& a': {
    ...title,
    marginTop: '.625rem',
    marginBottom: '0.75rem',
    minHeight: 'auto',
  },
};

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    ...cardTitle,
    textAlign: 'center',
  },
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:before,&:after': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
    '@media (min-width: 768px)': {
      width: '750px',
    },
    '@media (min-width: 992px)': {
      width: '970px',
    },
    '@media (min-width: 1200px)': {
      width: '1170px',
    },
    position: 'relative',
    zIndex: 3,
  },
  cardSignUp: {
    borderRadius: 6,
    boxShadow: `0 16px 24px 2px rgba(${hexToRgb(
      theme.palette.common.black,
    )}, 0.14), 0 6px 30px 5px rgba(${hexToRgb(
      theme.palette.common.black,
    )}, 0.12), 0 8px 10px -5px rgba(${hexToRgb(
      theme.palette.common.black,
    )}, 0.2)`,
    marginBottom: 100,
    padding: theme.spacing(5, 0),
    marginTop: '15vh',
  },

  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  form: {
    paddingTop: theme.spacing(4),
    padding: '0 20px',
    position: 'relative',
  },
  socialTitle: {
    fontSize: 18,
  },
  inputAdornment: {
    marginRight: 18,
    position: 'relative',
  },
  inputAdornmentIcon: {
    color: '#555555',
  },
  customFormControlClasses: {
    margin: theme.spacing(0, 1.5),
    width: '100%',
  },
  buttonContainer: {
    paddingTop: 27,
  },
}));

function RegisterPage(props) {
  const [values, change, submit, reset] = useForm(
    {
      username: '',
      password: '',
      confirmPassword: '',
    },
    () => console.log(values),
  );
  const classes = useStyles();
  const { username, password, confirmPassword } = values;

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} md={10}>
          <Card className={classes.cardSignUp}>
            <Typography variant="h2" className={classes.cardTitle}>
              Register
            </Typography>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} md={5}>
                  <InfoArea
                    title="Marketing"
                    description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                    icon={Timeline}
                    iconColor="secondary"
                  />
                  <InfoArea
                    title="Fully Coded in HTML5"
                    description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                    icon={Code}
                    iconColor="primary"
                  />
                  <InfoArea
                    title="Built Audience"
                    description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                    icon={Group}
                    iconColor="info"
                  />
                </GridItem>
                <GridItem xs={12} sm={8} md={5}>
                  <form className={classes.form} onSubmit={submit}>
                    <GridContainer>
                      <GridItem xs={12}>
                        <div className={classes.center}>
                          <Typography variant="h4">Create Account</Typography>
                        </div>
                      </GridItem>
                      <GridItem xs={12}>
                        <CustomInput
                          formControlProps={{
                            className: classes.customFormControlClasses,
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeHolder: 'Username...',
                            name: 'username',
                            id: 'username',
                            value: username,
                            onChange: change,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12}>
                        <CustomInput
                          formControlProps={{
                            className: classes.customFormControlClasses,
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Lock className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeHolder: 'Password...',
                            name: 'password',
                            id: 'password',
                            value: password,
                            onChange: change,
                            type: 'password',
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12}>
                        <CustomInput
                          formControlProps={{
                            className: classes.customFormControlClasses,
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Lock className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeHolder: 'Confirm Password...',
                            name: 'confirmPassword',
                            id: 'confirmPassword',
                            value: confirmPassword,
                            onChange: change,
                            type: 'password',
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12}>
                        <div
                          className={cx(
                            classes.center,
                            classes.buttonContainer,
                          )}
                        >
                          <Button type="submit" round color="primary">
                            Get Started
                          </Button>
                        </div>
                      </GridItem>
                    </GridContainer>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default RegisterPage;
