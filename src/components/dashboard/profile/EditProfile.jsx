import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { useForm } from '../../../hooks/useForm';
import { ActionsContext } from '../../../contexts/ActionsContext';
import { parseDate } from '../../utils/parseDate';
import ConfirmDialog from '../../../shared/ConfirmDialog';
import { useStyles } from '../../styles/useStyles';
import NavigationLinks from '../shared/NavigationLinks';

function EditProfile({ history: { push } }) {
  const classes = useStyles();
  const { token } = useSelector((state1) => state1.auth);
  const { profile, errors, isLoading, isSuccess } = useSelector(
    (state1) => state1.profile
  );
  const update = Boolean(profile.id);
  const actions = useContext(ActionsContext);
  const [values, change, submit, reset, setValues] = useForm(
    {
      firstName: '',
      middleName: '',
      lastName: '',
      preferredName: '',
      address: '',
      address1: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      altPhoneNumber: '',
      email: '',
      fullTime: false,
      partTime: false,
      temporary: false,
      weekdays: false,
      weekends: false,
      evenings: false,
      nights: false,
      referredBy: '',
      desiredPay: '',
      startDate: parseDate(),
      position: '',
      authYes: true,
      authNo: false,
      under18Yes: false,
      under18No: true,
      permitYes: false,
      permitNo: false,
      permitNA: true,
    },
    () => {
      if (!update) {
        actions.profile.addProfile(token, values);
      } else {
        actions.profile.updateProfile(token, values);
      }
    }
  );

  useEffect(() => {
    actions.profile.getProfile(token);
  }, [actions.profile, token]);

  useEffect(() => {
    actions.nav.drawerOff();
  }, [actions.nav]);

  useEffect(() => {
    setValues({ ...values, ...profile });
  }, [profile]);

  function handleClose() {
    actions.profile.resetProfileSuccess();
    push('/dashboard/employment');
  }

  const {
    firstName,
    middleName,
    lastName,
    preferredName,
    address,
    address1,
    city,
    state,
    zipCode,
    phoneNumber,
    altPhoneNumber,
    email,
    fullTime,
    partTime,
    temporary,
    weekdays,
    weekends,
    evenings,
    nights,
    referredBy,
    desiredPay,
    position,
    startDate,
    authYes,
    authNo,
    under18Yes,
    under18No,
    permitYes,
    permitNo,
    permitNA,
  } = values;
  return (
    <Container maxWidth="lg">
      <NavigationLinks
        currentTitle="Profile"
        nextTitle="Employment History"
        prevTitle="Home"
        nextUrl="/dashboard/employment"
        prevUrl="/dashboard"
      />
      <Paper className={clsx(classes.root, classes.appSpacing)}>
        <Typography variant="h4" className={classes.title}>
          Profile
        </Typography>
        <form className={classes.formControl} onSubmit={submit}>
          <div className={classes.formRows}>
            <TextField
              error={Boolean(errors && errors.data && errors.data.firstName)}
              helperText={errors && errors.data && errors.data.firstName}
              className={clsx(classes.four, classes.mobileSpacing)}
              required
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={change}
              autoFocus
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.middleName)}
              helperText={errors && errors.data && errors.data.middleName}
              id="middleName"
              label="Middle Name"
              name="middleName"
              className={clsx(classes.four, classes.mobileSpacing)}
              value={middleName}
              onChange={change}
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.lastName)}
              helperText={errors && errors.data && errors.data.lastName}
              id="lastName"
              label="Last Name"
              name="lastName"
              required
              className={clsx(classes.four, classes.mobileSpacing)}
              value={lastName}
              onChange={change}
            />
            <TextField
              error={Boolean(
                errors && errors.data && errors.data.preferredName
              )}
              helperText={errors && errors.data && errors.data.preferredName}
              id="preferredName"
              label="Preferred Name"
              name="preferredName"
              className={clsx(classes.four, classes.mobileSpacing)}
              value={preferredName}
              onChange={change}
            />
          </div>
          <div className={classes.formRows}>
            <TextField
              error={Boolean(errors && errors.data && errors.data.address)}
              helperText={errors && errors.data && errors.data.address}
              id="address"
              label="Address"
              name="address"
              required
              className={clsx(classes.one, classes.mobileSpacing)}
              value={address}
              onChange={change}
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.address1)}
              helperText={errors && errors.data && errors.data.address1}
              id="address1"
              label="Apartment or Suite"
              name="address1"
              className={clsx(classes.four, classes.mobileSpacing)}
              value={address1}
              onChange={change}
            />
          </div>
          <div className={classes.formRows}>
            <TextField
              error={Boolean(errors && errors.data && errors.data.city)}
              helperText={errors && errors.data && errors.data.city}
              id="city"
              label="City"
              name="city"
              className={clsx(classes.three, classes.mobileSpacing)}
              required
              value={city}
              onChange={change}
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.state)}
              helperText={errors && errors.data && errors.data.state}
              id="state"
              label="State"
              name="state"
              className={clsx(classes.three, classes.mobileSpacing)}
              required
              value={state}
              onChange={change}
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.zipCode)}
              helperText={errors && errors.data && errors.data.zipCode}
              id="zipCode"
              label="Zip Code"
              name="zipCode"
              className={clsx(classes.three, classes.mobileSpacing)}
              required
              value={zipCode}
              onChange={change}
            />
          </div>
          <div className={classes.formRows}>
            <TextField
              error={Boolean(errors && errors.data && errors.data.phoneNumber)}
              helperText={errors && errors.data && errors.data.phoneNumber}
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              className={clsx(classes.three, classes.mobileSpacing)}
              required
              value={phoneNumber}
              onChange={change}
            />
            <TextField
              error={Boolean(
                errors && errors.data && errors.data.altPhoneNumber
              )}
              helperText={errors && errors.data && errors.data.altPhoneNumber}
              id="altPhoneNumber"
              label="Alternate Phone Number"
              name="altPhoneNumber"
              className={clsx(classes.three, classes.mobileSpacing)}
              value={altPhoneNumber}
              onChange={change}
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.email)}
              helperText={errors && errors.data && errors.data.email}
              id="email"
              label="Email Address"
              name="email"
              className={clsx(classes.three, classes.mobileSpacing)}
              required
              value={email}
              onChange={change}
            />
          </div>
          <div className={classes.formRows}>
            <div>
              <Typography gutterBottom variant="body1">
                Are you interested in?
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={fullTime} onChange={change} />}
                label="Full Time"
                name="fullTime"
              />
              <FormControlLabel
                control={<Checkbox checked={partTime} onChange={change} />}
                label="Part Time"
                name="partTime"
              />
              <FormControlLabel
                control={<Checkbox checked={temporary} onChange={change} />}
                label="Temporary"
                name="temporary"
              />
            </div>
            <div>
              <Typography gutterBottom variant="body1">
                What schedule would you prefer?
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={weekdays} onChange={change} />}
                label="Weekdays"
                name="weekdays"
              />
              <FormControlLabel
                control={<Checkbox checked={weekends} onChange={change} />}
                label="Weekends"
                name="weekends"
              />
              <FormControlLabel
                control={<Checkbox checked={evenings} onChange={change} />}
                label="Evenings"
                name="evenings"
              />
              <FormControlLabel
                control={<Checkbox checked={nights} onChange={change} />}
                label="Nights"
                name="nights"
              />
            </div>
          </div>
          <div className={classes.formRows}>
            <TextField
              error={Boolean(errors && errors.data && errors.data.referredBy)}
              helperText={errors && errors.data && errors.data.referredBy}
              id="referredBy"
              label="Referral"
              name="referredBy"
              className={clsx(classes.four, classes.mobileSpacing)}
              value={referredBy}
              onChange={change}
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.desiredPay)}
              helperText={errors && errors.data && errors.data.desiredPay}
              id="desiredPay"
              label="Desired Pay"
              name="desiredPay"
              className={clsx(classes.four, classes.mobileSpacing)}
              value={desiredPay}
              onChange={change}
              required
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.startDate)}
              helperText={errors && errors.data && errors.data.startDate}
              id="startDate"
              label="Date you can start"
              name="startDate"
              className={clsx(classes.four, classes.mobileSpacing)}
              value={startDate}
              type="date"
              onChange={change}
              required
            />
            <TextField
              error={Boolean(errors && errors.data && errors.data.position)}
              helperText={errors && errors.data && errors.data.position}
              id="position"
              label="Position Desired"
              name="position"
              className={clsx(classes.four, classes.mobileSpacing)}
              value={position}
              onChange={change}
              required
            />
          </div>
          <div className={classes.formRows}>
            <div>
              <Typography gutterBottom>
                Are you authorized to work in the United States?
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={authYes} onChange={change} />}
                label="Yes"
                name="authYes"
              />
              <FormControlLabel
                control={<Checkbox checked={authNo} onChange={change} />}
                label="No"
                name="authNo"
              />
            </div>

            <div>
              <Typography gutterBottom>
                Are you under 18 years of age?
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={under18Yes} onChange={change} />}
                label="Yes"
                name="under18Yes"
              />
              <FormControlLabel
                control={<Checkbox checked={under18No} onChange={change} />}
                label="No"
                name="under18No"
              />
            </div>
            <div>
              <Typography gutterBottom>
                If so, can you provide a work permit?
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={permitYes} onChange={change} />}
                label="Yes"
                name="permitYes"
                disabled={under18No}
              />
              <FormControlLabel
                control={<Checkbox checked={permitNo} onChange={change} />}
                label="No"
                name="permitNo"
                disabled={under18No}
              />
              <FormControlLabel
                control={<Checkbox checked={permitNA} onChange={change} />}
                label="N/A"
                name="permitNA"
                disabled
              />
            </div>
          </div>
          <Divider className={classes.appSpacing} />
          <div className={classes.buttons}>
            <Button color="primary" onClick={reset} disabled={isLoading}>
              Reset
            </Button>
            <Button color="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#670300"
                  height={20}
                  width={20}
                />
              ) : update ? (
                'Update'
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
        <Divider className={classes.appSpacing} />
      </Paper>
      <ConfirmDialog
        isSuccess={isSuccess}
        handleClose={handleClose}
        title={`${update ? 'Update' : 'Save'}`}
        message={`Your ${update ? 'update' : 'save'} was successful`}
      />
    </Container>
  );
}

EditProfile.propTypes = {
  history: PropTypes.object,
};

export default EditProfile;
