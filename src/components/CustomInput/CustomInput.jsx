import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  disabled: {
    '&:before': {
      borderColor: 'transparent !important',
    },
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: '#d2d2d2 !important',
      borderWidth: '1px !important',
    },
    '&:after': {
      borderColor: theme.palette.primary.main,
    },
    '& + p': {
      fontWeight: 300,
    },
  },
  underlineError: {
    '*:after': {
      borderColor: theme.palette.error.main,
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: theme.palette.success.main,
    },
  },
  labelRoot: {
    color: '#aaaaaa !important',
    fontWeight: 400,
    lineHeight: 1.42857,
    top: 10,
    letterSpacing: 'unset',
    '& + $underline': {
      marginTop: 0,
    },
  },
  labelRootError: {
    color: `${theme.palette.error.main} !important`,
  },
  labelRootSuccess: {
    color: `${theme.palette.success.main} !important`,
  },
  formControl: {
    margin: theme.spacing(0, 0, 2, 0),
    paddingTop: 27,
    position: 'relative',
    verticalAlign: 'unset',
    '& svg,& .fab,& .far,& .fal,& .fas,& .material-icons': {
      color: '#495057',
    },
  },
  whiteUnderline: {
    '&hover:not($disabled):before,&:before': {
      backgroundColor: theme.palette.common.white,
    },
    '&:after': {
      backgroundColor: theme.palette.common.white,
    },
  },
  input: {
    color: '#495057',
    height: 'unset',
    '&,&::placeholder': {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.42857,
      opacity: 1,
    },
    '&::placeholder': {
      color: '#aaaaaa',
    },
  },
  whiteInput: {
    '&,&::placeholder': {
      color: theme.palette.common.white,
      opacity: 1,
    },
  },
}));

function CustomInput({
  labelProps,
  error,
  formControlProps,
  helperText,
  id,
  inputProps,
  inputRootCustomClasses,
  labelText,
  success,
  white,
}) {
  const classes = useStyles();
  const labelClasses = cx({
    [classes.labelRoot]: true,
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = cx({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = cx({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = cx({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  const formControlClasses = cx({
    [formControlProps.className]: true,
    [classes.formControl]: true,
  });
  const helperTextClasses = cx({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
  });
  const newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
  };

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText && (
        <InputLabel className={labelClasses} htmlFor={id} {...labelProps}>
          {labelText}
        </InputLabel>
      )}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
        inputProps={newInputProps}
      />
      {helperText && (
        <FormHelperText id={`${id}-text`} className={helperTextClasses}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helperText: PropTypes.node,
};

export default CustomInput;
