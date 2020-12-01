import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import EducationFields from './EducationFields';
import { ActionsContext } from '../../../contexts/ActionsContext';
import ConfirmDialog from '../../../shared/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
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

function EducationItem({ values }) {
  const classes = useStyles();
  const { token } = useSelector((state) => state.auth);
  const actions = useContext(ActionsContext);
  const [isDelete, setIsDelete] = useState(false);

  function handleDelete(id) {
    actions.education.deleteEducationData(token, id);
  }

  return (
    <>
      <Paper className={classes.root}>
        <form className={classes.formControl}>
          <EducationFields values={values} />
          <Divider className={classes.divider} />
          <div className={classes.buttons}>
            <Button color="primary" onClick={() => setIsDelete(true)}>
              Delete
            </Button>
            <Button
              color="primary"
              component={RouterLink}
              to={`/dashboard/education/edit/${values.id}`}
            >
              Edit
            </Button>
          </div>
        </form>
      </Paper>
      <ConfirmDialog
        isSuccess={isDelete}
        title="Delete Education Item"
        message="Are you sure you want to delete this?"
        cancel
        handleClose={() => handleDelete(values.id)}
        handleCancel={() => setIsDelete(false)}
      />
    </>
  );
}

EducationItem.propTypes = {
  values: PropTypes.object,
};

export default EducationItem;
