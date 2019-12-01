import React, {useContext, useEffect} from 'react';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Checkbox, Container, Divider, FormControlLabel, Paper, TextField, Typography} from "@material-ui/core";
import {useForm} from "../../../hooks/useForm";
import {parseDate} from "../../utils/parseDate";
import {useSelector} from "react-redux";
import {ActionsContext} from "../../../contexts/ActionsContext";
import ConfirmDialog from "../../../shared/ConfirmDialog";
import {useStyles} from "../../styles/useStyles";
import Loader from "react-loader-spinner";

const useStyles2 = makeStyles(theme => ({
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
    formRows: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(1, 0)
    },
    firstRow: {
        width: 'calc(33% - 10px)'
    },
    contact: {
        padding: theme.spacing(2, 2, 0, 0)
    },
    evenRows: {
        width: 'calc(50% - 10px)'
    },
    contactContainer: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
}));

function AddEmployment(props) {
    const {errors, employment, isLoading, isSuccess} = useSelector(state => state.employment);
    const {token} = useSelector(state => state.auth);
    const actions = useContext(ActionsContext);
    const edit = Boolean(props.match.params.id);
    const classes = useStyles();
    const [values, change, submit, reset, setValues] = useForm({
        companyName: '',
        cityState: '',
        phoneNumber: '',
        supervisor: '',
        startDate: parseDate(),
        endDate: parseDate(),
        reasonForLeaving: '',
        contactYes: true,
        contactNo: false
    }, doSubmit);

    useEffect(() => {
        if (edit) {
            const editedItem = employment.filter(item => item.id.toString() === props.match.params.id)[0];
            const editingItem = {
                ...editedItem,
                startDate: parseDate(editedItem.startDate),
                endDate: parseDate(editedItem.endDate)
            };
            setValues(editingItem);
        }
    }, [edit]);

    async function doSubmit() {
        if (edit) {
            await actions.employment.updateEmploymentData(token, values)
        } else {
            await actions.employment.addEmploymentData(token, values);
        }
    }

    function handleClose() {
        actions.employment.resetEmploymentSuccess();
        props.history.push('/dashboard/employment')
    }

    return (
        <Container maxWidth='lg'>
            <Paper className={classes.root}>
                <Typography variant='h4'
                            className={classes.title}>{`${edit ? 'Update' : 'Add New'} Employment Record`}</Typography>
                <form onSubmit={submit} className={classes.formControl}>
                    <div className={classes.formRows}>
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.companyName)}
                            helperText={errors && errors.data && errors.data.companyName}
                            className={classes.three}
                            required
                            id="companyName"
                            label="Company Name"
                            name="companyName"
                            value={values.companyName}
                            onChange={change}
                            autoFocus
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.cityState)}
                            helperText={errors && errors.data && errors.data.cityState}
                            className={classes.three}
                            required
                            id="cityState"
                            label="City and State"
                            name="cityState"
                            value={values.cityState}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.phoneNumber)}
                            helperText={errors && errors.data && errors.data.phoneNumber}
                            className={classes.three}
                            required
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={change}
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.supervisor)}
                            helperText={errors && errors.data && errors.data.supervisor}
                            className={classes.three}
                            required
                            id="supervisor"
                            label="Supervisor"
                            name="supervisor"
                            value={values.supervisor}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.startDate)}
                            helperText={errors && errors.data && errors.data.startDate}
                            className={classes.three}
                            required
                            id="startDate"
                            label="Start Date"
                            name="startDate"
                            value={values.startDate}
                            onChange={change}
                            type='date'
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.endDate)}
                            helperText={errors && errors.data && errors.data.endDate}
                            className={classes.three}
                            required
                            id="endDate"
                            label="End Date"
                            name="endDate"
                            value={values.endDate}
                            onChange={change}
                            type='date'
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.reasonForLeaving)}
                            helperText={errors && errors.data && errors.data.reasonForLeaving}
                            className={classes.two}
                            required
                            id="reasonForLeaving"
                            label="Reason for Leaving"
                            name="reasonForLeaving"
                            value={values.reasonForLeaving}
                            onChange={change}
                        />
                        <div className={clsx(classes.two, classes.contactContainer)}>
                            <Typography paragraph className={classes.contact}>May we contact?</Typography>
                            <FormControlLabel control={<Checkbox checked={values.contactYes} onChange={change}/>}
                                              label='Yes' name='contactYes'/>
                            <FormControlLabel control={<Checkbox checked={values.contactNo} onChange={change}/>}
                                              label='No' name='contactNo'/>
                        </div>
                    </div>
                    <Divider className={classes.divider}/>
                    <div className={classes.buttons}>
                        <Button color='primary' onClick={reset} disabled={isLoading}>Reset</Button>
                        <Button color='primary' type='submit'
                                disabled={isLoading}>{isLoading ? <Loader type='ThreeDots' color='#670300' height={20} width={20} />  : edit ? 'Update' : 'Save'}</Button>
                    </div>
                </form>
            </Paper>
            <ConfirmDialog isSuccess={isSuccess} handleClose={handleClose} title={`${edit ? 'Update' : 'Save'}`}
                           message={`Your ${edit ? 'update' : 'save'} was successful!`}/>
        </Container>
    )
}

export default AddEmployment;
