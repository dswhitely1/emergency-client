import React, {useContext, useEffect} from 'react';
import {useSelector} from "react-redux";
import {ActionsContext} from "../../../contexts/ActionsContext";
import {useForm} from "../../../hooks/useForm";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ConfirmDialog from "../../../shared/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(3)
    },
    title: {
        textAlign: 'center'
    },
    formControl: {
        display: 'flex',
        flexDirection: 'column'
    },
    divider: {
        margin: theme.spacing(1, 0)
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

function AddEducation(props) {
    const {education, isLoading, isSuccess, errors} = useSelector(state => state.education);
    const {token} = useSelector(state => state.auth);
    const actions = useContext(ActionsContext);
    const edit = Boolean(props.match.params.id);
    const [values, change, submit, reset, setValues] = useForm({
        schoolName: '',
        subject: '',
        graduate: 'Yes',
        received: 'Diploma'
    }, doSubmit);

    useEffect(() => {
        if (edit) {
            const editingItem = education.filter(item => item.id.toString() === props.match.params.id)[0];
            setValues(editingItem);
        }
    }, [edit, education, props.match.params.id, setValues]);

    function doSubmit() {
        if (edit) {
            actions.education.updateEducationData(token, values)
        } else {
            actions.education.addEducationData(token, values);
        }
    }

    function handleClose() {
        actions.education.resetEducationSuccess();
        props.history.push('/dashboard/education');
    }

    const classes = useStyles();
    return (
        <Container maxWidth='lg'>
            <Paper className={classes.root}>
                <Typography variant='h4'
                            className={classes.title}>{`${edit ? 'Update' : 'Add New'} Education Record`}</Typography>
                <form onSubmit={submit} className={classes.formControl}>
                    <TextField
                        error={Boolean(errors && errors.data && errors.data.schoolName)}
                        helperText={errors && errors.data && errors.data.schoolName}
                        className={classes.divider}
                        required
                        id="schoolName"
                        label="School Name"
                        name="schoolName"
                        value={values.schoolName}
                        onChange={change}
                        autoFocus
                    />
                    <TextField
                        error={Boolean(errors && errors.data && errors.data.subject)}
                        helperText={errors && errors.data && errors.data.subject}
                        className={classes.divider}
                        required
                        id="subject"
                        label="Subjects Studied"
                        name="subject"
                        value={values.subject}
                        onChange={change}
                    />
                    <FormControl className={classes.divider}>
                        <InputLabel id='graduate-select-label'>Did you graduate?</InputLabel>
                        <Select labelId='graduate-select-label' id='graduate-select' value={values.graduate}
                                onChange={change} name='graduate'>
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.divider}>
                        <InputLabel id='received-select-label'>Degree or Diploma</InputLabel>
                        <Select labelId='received-select-label' id='received-select' value={values.received}
                                onChange={change} name='received'>
                            <MenuItem value={"Diploma"}>Diploma</MenuItem>
                            <MenuItem value={"Degree"}>Degree</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <Divider className={classes.divider}/>
                    <div className={classes.buttons}>
                        <Button color='primary' onClick={reset} disabled={isLoading}>Reset</Button>
                        <Button color='primary' type='submit' disabled={isLoading}>{edit ? 'Update' : 'Save'}</Button>
                    </div>
                </form>
            </Paper>
            <ConfirmDialog isSuccess={isSuccess} handleClose={handleClose} title={`${edit ? 'Update' : 'Save'}`}
                           message={`Your ${edit ? 'update' : 'save'} was successful!`}/>
        </Container>
    )
}

export default AddEducation;
