import React from 'react';
import {
  InputLabel,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from '../../styles/useStyles';

function EducationFields({ values }) {
  const classes = useStyles();
  return (
    <div className={classes.formRows}>
      <TextField
        className={classes.four}
        required
        label="School Name"
        value={values.schoolName}
        disabled
      />
      <TextField
        className={classes.four}
        required
        label="Subject Studied"
        value={values.subject}
        disabled
      />
      <FormControl className={classes.four}>
        <InputLabel id="graduate-select-label">Did you graduate?</InputLabel>
        <Select
          labelId="graduate-select-label"
          id="graduate-select"
          value={values.graduate}
          disabled
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.four}>
        <InputLabel id="received-select-label">Degree or Diploma</InputLabel>
        <Select
          labelId="received-select-label"
          id="received-select"
          value={values.received}
          disabled
        >
          <MenuItem value="Diploma">Diploma</MenuItem>
          <MenuItem value="Degree">Degree</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

EducationFields.propTypes = {
  values: PropTypes.shape({
    schoolName: PropTypes.string,
    graduate: PropTypes.string,
    received: PropTypes.string,
    subject: PropTypes.string,
  }),
};

export default EducationFields;
