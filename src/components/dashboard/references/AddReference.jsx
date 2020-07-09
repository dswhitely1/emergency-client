import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ActionsContext } from '../../../contexts/ActionsContext';
import { useForm } from '../../../hooks/useForm';
import ConfirmDialog from '../../../shared/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function AddReference(props) {
  const { reference, isLoading, isSuccess, errors } = useSelector(
    (state) => state.reference,
  );
  const { token } = useSelector((state) => state.auth);
  const actions = useContext(ActionsContext);
  const edit = Boolean(props.match.params.id);
  const [values, change, submit, reset, setValues] = useForm(
    {
      name: '',
      relationship: '',
      years: '',
      phoneNumber: '',
    },
    doSubmit,
  );

  useEffect(() => {
    if (edit) {
      const editingItem = reference.filter(
        (item) => item.id.toString() === props.match.params.id,
      )[0];
      setValues(editingItem);
    }
  }, [edit]);

  function doSubmit() {
    if (edit) {
      actions.reference.updateReferenceData(token, values);
    } else {
      actions.reference.addReferenceData(token, values);
    }
  }

  function handleClose() {
    actions.reference.resetReferenceSuccess();
    props.history.push('/dashboard/references');
  }

  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          {`${edit ? 'Update' : 'Add New'} Reference Record`}
        </Typography>
        <form onSubmit={submit} className={classes.formControl}>
          <TextField
            error={Boolean(errors && errors.data && errors.data.name)}
            helperText={errors && errors.data && errors.data.name}
            className={classes.divider}
            required
            id="name"
            label="Name"
            name="name"
            value={values.name}
            onChange={change}
            autoFocus
          />
          <TextField
            error={Boolean(errors && errors.data && errors.data.relationship)}
            helperText={errors && errors.data && errors.data.relationship}
            className={classes.divider}
            required
            id="relationship"
            label="Relationship"
            name="relationship"
            value={values.relationship}
            onChange={change}
          />
          <TextField
            error={Boolean(errors && errors.data && errors.data.years)}
            helperText={errors && errors.data && errors.data.years}
            className={classes.divider}
            required
            id="years"
            label="Years known"
            name="years"
            value={values.years}
            onChange={change}
          />
          <TextField
            error={Boolean(errors && errors.data && errors.data.phoneNumber)}
            helperText={errors && errors.data && errors.data.phoneNumber}
            className={classes.divider}
            required
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={change}
          />
          <Divider className={classes.divider} />
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
              ) : edit ? (
                'Update'
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </Paper>
      <ConfirmDialog
        isSuccess={isSuccess}
        handleClose={handleClose}
        title={`${edit ? 'Update' : 'Save'}`}
        message={`Your ${edit ? 'update' : 'save'} was successful!`}
      />
    </Container>
  );
}

export default AddReference;
