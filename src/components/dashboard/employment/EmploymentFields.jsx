import React from 'react';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';
import { useStyles } from '../../styles/useStyles';

const useStyles2 = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(3),
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRows: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  firstRow: {
    width: 'calc(33% - 10px)',
  },
  contact: {
    padding: theme.spacing(2, 2, 0, 0),
  },
  evenRows: {
    width: 'calc(50% - 10px)',
  },
  contactContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

function EmploymentFields({ values }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.formRows}>
        <TextField
          className={classes.three}
          required
          id="companyName"
          label="Company Name"
          value={values.companyName}
          disabled
        />
        <TextField
          className={classes.three}
          required
          id="cityState"
          label="City and State"
          value={values.cityState}
          disabled
        />
        <TextField
          className={classes.three}
          required
          id="phoneNumber"
          label="Phone Number"
          value={values.phoneNumber}
          disabled
        />
      </div>
      <div className={classes.formRows}>
        <TextField
          className={classes.three}
          required
          id="supervisor"
          label="Supervisor"
          value={values.supervisor}
          disabled
        />
        <TextField
          className={classes.three}
          required
          id="startDate"
          label="Start Date"
          name="startDate"
          value={values.startDate.slice(0, 10).toString()}
          disabled
          type="date"
        />
        <TextField
          className={classes.three}
          required
          id="endDate"
          label="End Date"
          value={values.endDate.slice(0, 10).toString()}
          type="date"
          disabled
        />
      </div>
      <div className={classes.formRows}>
        <TextField
          className={classes.two}
          required
          id="reasonForLeaving"
          label="Reason for Leaving"
          value={values.reasonForLeaving}
          disabled
        />
        <div className={clsx(classes.two, classes.contentContainer)}>
          <Typography className={classes.contact}>May we contact?</Typography>
          <FormControlLabel
            control={<Checkbox checked={values.contactYes} disabled />}
            label="Yes"
            name="contactYes"
          />
          <FormControlLabel
            control={<Checkbox checked={values.contactNo} disabled />}
            label="No"
            name="contactNo"
          />
        </div>
      </div>
    </>
  );
}

export default EmploymentFields;
