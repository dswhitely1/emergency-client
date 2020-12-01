import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from '../../styles/useStyles';

function ReferenceFields({ values }) {
  const classes = useStyles();
  return (
    <div className={classes.formRows}>
      <TextField
        className={classes.four}
        required
        label="Name"
        value={values.name}
        disabled
      />
      <TextField
        className={classes.four}
        required
        label="Relationship"
        value={values.relationship}
        disabled
      />
      <TextField
        className={classes.four}
        required
        label="Years Known"
        value={values.years}
        disabled
      />
      <TextField
        className={classes.four}
        required
        label="PhoneNumber"
        value={values.phoneNumber}
        disabled
      />
    </div>
  );
}

ReferenceFields.propTypes = {
  values: PropTypes.object,
};

export default ReferenceFields;
