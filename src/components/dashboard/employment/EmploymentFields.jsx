import React from 'react';
import {
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useStyles } from '../../styles/useStyles';

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

EmploymentFields.propTypes = {
  values: PropTypes.object,
};

export default EmploymentFields;
