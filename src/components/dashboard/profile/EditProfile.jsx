import React, {useContext, useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {useForm} from "../../../hooks/useForm";
import {ActionsContext} from "../../../contexts/ActionsContext";
import {useSelector} from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from '@material-ui/core/Container'


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
    formRows: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(1, 0)
    },
    firstRow: {
        width: 'calc(25% - 10px)'
    },
    address: {
        width: 'calc(75% - 10px)'
    },
    address2: {
        width: 'calc(25% - 10px)'
    },
    thirdRow: {
        width: 'calc(33% - 10px)'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    middleContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(2, 0)
    }
}));

function EditProfile({history: {push}}) {
    const classes = useStyles();
    const {token} = useSelector(state => state.auth);
    const {profile, errors, isLoading} = useSelector(state => state.profile);
    const update = Boolean(profile.id);
    const actions = useContext(ActionsContext);
    const [values, change, submit, reset, setValues] = useForm({
        firstName: '',
        middleName: '',
        lastName: '',
        preferredName: '',
        address: '',
        address1: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        altPhoneNumber: '',
        email: '',
        fullTime: false,
        partTime: false,
        temporary: false,
        weekdays: false,
        weekends: false,
        evenings: false,
        nights: false,
        referredBy: '',
        desiredPay: '',
        startDate: parseDate(),
        position: '',
        authYes: true,
        authNo: false,
        under18Yes: false,
        under18No: true,
        permitYes: false,
        permitNo: false,
        permitNA: true
    }, submitProfile);

    function parseDate() {
        const newDate = new Date();
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
        const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
        return `${year}-${month}-${day}`
    }

    useEffect(() => {
        actions.profile.getProfile(token)
    }, []);

    useEffect(() => {
        setValues({...values, ...profile});
    }, [profile]);

    function submitProfile() {
        if (!update) {
            actions.profile.addProfile(token, values);
        } else {
            actions.profile.updateProfile(token, values);
        }
        push('/dashboard')
    }

    const {firstName, middleName, lastName, preferredName, address, address1, city, state, zipCode, phoneNumber, altPhoneNumber, email, fullTime, partTime, temporary, weekdays, weekends, evenings, nights, referredBy, desiredPay, position, startDate, authYes, authNo, under18Yes, under18No, permitYes, permitNo, permitNA} = values;
    return (
        <Container maxWidth='lg'>
            <Paper className={classes.root}>
                <Typography variant='h4' className={classes.title}>Profile</Typography>
                <form className={classes.formControl} onSubmit={submit}>
                    <div className={classes.formRows}>
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.firstName)}
                            helperText={errors && errors.data && errors.data.firstName}
                            className={classes.firstRow}
                            required
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={change}
                            autoFocus
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.middleName)}
                            helperText={errors && errors.data && errors.data.middleName}
                            id='middleName'
                            label='Middle Name'
                            name='middleName'
                            className={classes.firstRow}
                            value={middleName}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.lastName)}
                            helperText={errors && errors.data && errors.data.lastName}
                            id='lastName'
                            label='Last Name'
                            name='lastName'
                            required
                            className={classes.firstRow}
                            value={lastName}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.preferredName)}
                            helperText={errors && errors.data && errors.data.preferredName}
                            id='preferredName'
                            label='Preferred Name'
                            name='preferredName'
                            className={classes.firstRow}
                            value={preferredName}
                            onChange={change}
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.address)}
                            helperText={errors && errors.data && errors.data.address}
                            id='address'
                            label="Address"
                            name='address'
                            required
                            className={classes.address}
                            value={address}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.address1)}
                            helperText={errors && errors.data && errors.data.address1}
                            id='address1'
                            label="Apartment or Suite"
                            name='address1'
                            className={classes.address2}
                            value={address1}
                            onChange={change}
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.city)}
                            helperText={errors && errors.data && errors.data.city}
                            id='city'
                            label='City'
                            name='city'
                            className={classes.thirdRow}
                            required
                            value={city}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.state)}
                            helperText={errors && errors.data && errors.data.state}
                            id='state'
                            label='State'
                            name='state'
                            className={classes.thirdRow}
                            required
                            value={state}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.zipCode)}
                            helperText={errors && errors.data && errors.data.zipCode}
                            id='zipCode'
                            label='Zip Code'
                            name='zipCode'
                            className={classes.thirdRow}
                            required
                            value={zipCode}
                            onChange={change}
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.phoneNumber)}
                            helperText={errors && errors.data && errors.data.phoneNumber}
                            id='phoneNumber'
                            label='Phone Number'
                            name='phoneNumber'
                            className={classes.thirdRow}
                            required
                            value={phoneNumber}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.altPhoneNumber)}
                            helperText={errors && errors.data && errors.data.altPhoneNumber}
                            id='altPhoneNumber'
                            label='Alternate Phone Number'
                            name='altPhoneNumber'
                            className={classes.thirdRow}
                            value={altPhoneNumber}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.email)}
                            helperText={errors && errors.data && errors.data.email}
                            id='email'
                            label='Email Address'
                            name='email'
                            className={classes.thirdRow}
                            required
                            value={email}
                            onChange={change}
                        />
                    </div>
                    <div className={classes.middleContent}>
                        <div>
                            <Typography variant='h6'>Are you interested in?</Typography>
                            <FormControlLabel control={<Checkbox checked={fullTime} onChange={change}/>}
                                              label='Full Time' name='fullTime'/>
                            <FormControlLabel control={<Checkbox checked={partTime} onChange={change}/>}
                                              label='Part Time' name='partTime'/>
                            <FormControlLabel control={<Checkbox checked={temporary} onChange={change}/>}
                                              label='Temporary' name='temporary'/>
                        </div>
                        <div>
                            <Typography variant='h6'>What schedule would you prefer?</Typography>
                            <FormControlLabel control={<Checkbox checked={weekdays} onChange={change}/>}
                                              label='Weekdays' name='weekdays'/>
                            <FormControlLabel control={<Checkbox checked={weekends} onChange={change}/>}
                                              label='Weekends' name='weekends'/>
                            <FormControlLabel control={<Checkbox checked={evenings} onChange={change}/>}
                                              label='Evenings' name='evenings'/>
                            <FormControlLabel control={<Checkbox checked={nights} onChange={change}/>} label='Nights'
                                              name='nights'/>
                        </div>
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.referredBy)}
                            helperText={errors && errors.data && errors.data.referredBy}
                            id='referredBy'
                            label='Referral'
                            name='referredBy'
                            className={classes.firstRow}
                            value={referredBy}
                            onChange={change}
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.referredBy)}
                            helperText={errors && errors.data && errors.data.referredBy}
                            id='desiredPay'
                            label='Desired Pay'
                            name='desiredPay'
                            className={classes.firstRow}
                            value={desiredPay}
                            onChange={change}
                            required
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.referredBy)}
                            helperText={errors && errors.data && errors.data.referredBy}
                            id='startDate'
                            label='Date you can start'
                            name='startDate'
                            className={classes.firstRow}
                            value={startDate}
                            type='date'
                            onChange={change}
                            required
                        />
                        <TextField
                            error={Boolean(errors && errors.data && errors.data.referredBy)}
                            helperText={errors && errors.data && errors.data.referredBy}
                            id='position'
                            label='Position Desired'
                            name='position'
                            className={classes.firstRow}
                            value={position}
                            onChange={change}
                            required
                        />
                    </div>
                    <div className={classes.middleContent}>
                        <div>
                            <Typography paragraph>Are you authorized to work in the United States?</Typography>
                            <FormControlLabel control={<Checkbox checked={authYes} onChange={change}/>}
                                              label='Yes' name='authYes'/>
                            <FormControlLabel control={<Checkbox checked={authNo} onChange={change}/>}
                                              label='No' name='authNo'/>
                        </div>

                            <div>
                                <Typography paragraph>Are you under 18 years of age?</Typography>
                                <FormControlLabel control={<Checkbox checked={under18Yes} onChange={change}/>}
                                                  label='Yes' name='under18Yes'/>
                                <FormControlLabel control={<Checkbox checked={under18No} onChange={change}/>}
                                                  label='No' name='under18No'/>
                            </div>
                            <div>
                                <Typography paragraph>If so, can you provide a work permit?</Typography>
                                <FormControlLabel control={<Checkbox checked={permitYes} onChange={change}/>}
                                                  label='Yes' name='permitYes' disabled={under18No}/>
                                <FormControlLabel control={<Checkbox checked={permitNo} onChange={change}/>}
                                                  label='No' name='permitNo' disabled={under18No}/>
                                <FormControlLabel control={<Checkbox checked={permitNA} onChange={change}/>}
                                                  label='N/A' name='permitNA' disabled/>
                            </div>

                    </div>
                    <Divider className={classes.divider}/>
                    <div className={classes.buttons}>
                        <Button color='primary' onClick={reset}>Reset</Button>
                        <Button color='primary' type='submit'
                                disabled={Object.is(values, profile)}>{update ? 'Update' : 'Save'}</Button>
                    </div>
                </form>
            </Paper>
        </Container>
    )
}

export default EditProfile;

