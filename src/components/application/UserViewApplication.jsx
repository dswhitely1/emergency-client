import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { ActionsContext } from '../../contexts/ActionsContext';
import EmploymentFields from '../dashboard/employment/EmploymentFields';
import EducationFields from '../dashboard/education/EducationFields';
import ReferenceFields from '../dashboard/references/ReferenceFields';
import { useStyles } from '../styles/useStyles';
import ViewApplication from './ViewApplication';

function UserViewApplication() {
  const classes = useStyles();
  const actions = useContext(ActionsContext);
  const {
    auth: { token },
    profile: { profile },
    employment: { employment },
    education: { education },
    reference: { reference },
  } = useSelector((state) => state);
  const { isAdmin } = useSelector((state) => state.admin);
  useEffect(() => {
    if (!profile.id) {
      actions.profile.getProfile(token);
      actions.employment.fetchEmploymentData(token);
      actions.education.fetchEducationData(token);
      actions.reference.fetchReferenceData(token);
      actions.auth.checkAdmin(token);
    }
  }, []);

  if (!profile.id) {
    return (
      <>
        <Typography
          variant="h2"
          className={clsx(classes.title, classes.appSpacing)}
        >
          No Application on File...
        </Typography>
        <Typography
          paragraph
          className={clsx(classes.title, classes.appSpacing)}
        >
          Click <Link to="/dashboard/profile">Here</Link> to get started
        </Typography>
      </>
    );
  }

  return (
    <ViewApplication
      values={profile}
      employment={employment}
      education={education}
      reference={reference}
    />
  );
}

export default UserViewApplication;
