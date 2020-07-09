import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import { ActionsContext } from '../../../contexts/ActionsContext';
import ViewApplication from '../../application/ViewApplication';
import { parseDate } from '../../utils/parseDate';
import Spinner from '../../dashboard/shared/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  },
  formControl: {
    minWidth: 300,
  },
}));

function AdminSelectProfile() {
  const {
    isLoading,
    profiles,
    selectedProfile: { profile, employment, education, reference },
  } = useSelector((state) => state.admin);
  const { token } = useSelector((state) => state.auth);
  const actions = useContext(ActionsContext);
  const [userProfile, setUserProfile] = useState({});
  const [userEmployment, setUserEmployment] = useState([]);
  const [selectProfile, setSelectProfile] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (profiles.length > 0) {
      setSelectProfile(profiles[0].userId);
    }
  }, [profiles]);

  useEffect(() => {
    actions.admin.fetchUserProfile(token, selectProfile);
  }, [actions.admin, selectProfile, token]);

  useEffect(() => {
    const newProfile = { ...profile, startDate: parseDate(profile.startDate) };
    setUserProfile(newProfile);
  }, [profile]);

  useEffect(() => {
    setUserEmployment(
      employment.map((item) => {
        return {
          ...item,
          startDate: parseDate(item.startDate),
          endDate: parseDate(item.endDate),
        };
      }),
    );
  }, [employment]);

  return (
    <>
      <Container maxWidth="lg">
        <Paper className={classes.root}>
          <Typography variant="h6">Select Profile</Typography>
          <FormControl className={classes.formControl}>
            <InputLabel id="graduate-select-label">Select Profile</InputLabel>
            <Select
              labelId="graduate-select-label"
              id="graduate-select"
              value={selectProfile}
              onChange={(e) => setSelectProfile(e.target.value)}
            >
              {profiles.map(({ userId, firstName, lastName }) => (
                <MenuItem key={profile.id} value={userId}>
                  {`${firstName} ${lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Container>
      {isLoading ? (
        <Spinner />
      ) : (
        profile.id && (
          <ViewApplication
            values={profile}
            employment={userEmployment}
            reference={reference}
            education={education}
          />
        )
      )}
    </>
  );
}

export default AdminSelectProfile;
