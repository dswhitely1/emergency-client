import React, {useContext, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/Styles";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {ActionsContext} from "../../contexts/ActionsContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import EmploymentFields from "../dashboard/employment/EmploymentFields";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import EducationFields from "../dashboard/education/EducationFields";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(3),
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        minWidth: 650
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(2)
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
    middleContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(2, 0)
    },
    divider: {
        margin: theme.spacing(2, 0)
    }
}));

function ViewApplication() {
    const classes = useStyles();
    const actions = useContext(ActionsContext);
    const {token} = useSelector(state => state.auth);
    const {profile} = useSelector(state => state.profile);
    const {employment} = useSelector(state => state.employment);
    const {education} = useSelector(state => state.education);

    useEffect(() => {
        if (!profile.id) {
            actions.profile.getProfile(token);
            actions.employment.fetchEmploymentData(token)
            actions.education.fetchEducationData(token);
        }
    }, []);

    if (!profile.id) {
        return (
            <>
                <Typography variant='h2' className={classes.title}>No Application on File...</Typography>
                <Typography paragraph className={classes.title}>Click {<Link to='/dashboard/profile'>Here</Link>} to get started</Typography>
            </>)
    }

    const {firstName, middleName, lastName, preferredName, address, address1, city, state, zipCode, phoneNumber, altPhoneNumber, email, fullTime, partTime, temporary, weekdays, weekends, evenings, nights, referredBy, desiredPay, startDate, position, authYes, authNo, under18Yes, under18No, permitYes, permitNo, permitNA} = profile;
    return (
        <Container maxWidth='lg'>
            <Paper className={classes.root}>
                <Typography variant='h5' className={classes.title}>Application for Employment</Typography>
                <Typography paragraph>
                    EMERGENCY ELECTRIC, INC is an equal opportunity employer and does not discriminate
                    against any applicant or employee based on race, color, religion, sex, national origin,
                    disability, age, or military or veteran status in accordance with federal law. In addition,
                    EMERGENCY ELECTRIC, INC complies with applicable state and local laws governing nondiscrimination in
                    employment in every jurisdiction in which it maintains facilities.
                    EMERGENCY ELECTRIC, INC also provides reasonable accommodation to qualified
                    individuals with disabilities in accordance with applicable laws.
                </Typography>
                <Typography variant='h5' className={classes.title}>Personal Data</Typography>
                <form className={classes.formControl}>
                    <div className={classes.formRows}>
                        <TextField
                            className={classes.firstRow}
                            required
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            value={firstName}
                            disabled
                        />
                        <TextField
                            id='middleName'
                            label='Middle Name'
                            name='middleName'
                            className={classes.firstRow}
                            value={middleName}
                            disabled
                        />
                        <TextField
                            id='lastName'
                            label='Last Name'
                            name='lastName'
                            required
                            className={classes.firstRow}
                            value={lastName}
                            disabled
                        />
                        <TextField
                            id='preferredName'
                            label='Preferred Name'
                            name='preferredName'
                            className={classes.firstRow}
                            value={preferredName}
                            disabled
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            id='address'
                            label="Address"
                            name='address'
                            required
                            className={classes.address}
                            value={address}
                            disabled
                        />
                        <TextField
                            id='address1'
                            label="Apartment or Suite"
                            name='address1'
                            className={classes.address2}
                            value={address1}
                            disabled
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            id='city'
                            label='City'
                            name='city'
                            className={classes.thirdRow}
                            required
                            value={city}
                            disabled
                        />
                        <TextField
                            id='state'
                            label='State'
                            name='state'
                            className={classes.thirdRow}
                            required
                            value={state}
                            disabled
                        />
                        <TextField
                            id='zipCode'
                            label='Zip Code'
                            name='zipCode'
                            className={classes.thirdRow}
                            required
                            value={zipCode}
                            disabled
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            id='phoneNumber'
                            label='Phone Number'
                            name='phoneNumber'
                            className={classes.thirdRow}
                            required
                            value={phoneNumber}
                            disabled
                        />
                        <TextField
                            id='altPhoneNumber'
                            label='Alternate Phone Number'
                            name='altPhoneNumber'
                            className={classes.thirdRow}
                            value={altPhoneNumber}
                            disabled
                        />
                        <TextField
                            id='email'
                            label='Email Address'
                            name='email'
                            className={classes.thirdRow}
                            required
                            value={email}
                            disabled
                        />
                    </div>
                    <div className={classes.middleContent}>
                        <div>
                            <Typography variant='h6'>Are you interested in?</Typography>
                            <FormControlLabel control={<Checkbox checked={fullTime} disabled/>} label='Full Time'/>
                            <FormControlLabel control={<Checkbox checked={partTime} disabled/>} label='Part Time'/>
                            <FormControlLabel control={<Checkbox checked={temporary} disabled/>} label='Temporary'/>
                        </div>
                        <div>
                            <Typography variant='h6'>What schedule would you prefer?</Typography>
                            <FormControlLabel control={<Checkbox checked={weekdays} disabled/>} label='Weekdays'/>
                            <FormControlLabel control={<Checkbox checked={weekends} disabled/>} label='Weekends'/>
                            <FormControlLabel control={<Checkbox checked={evenings} disabled/>} label='Evenings'/>
                            <FormControlLabel control={<Checkbox checked={nights} disabled/>} label='Nights'/>
                        </div>
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            id='referredBy'
                            label='Referral'
                            name='referredBy'
                            className={classes.firstRow}
                            value={referredBy}
                            disabled
                        />
                        <TextField
                            id='desiredPay'
                            label='Desired Pay'
                            name='desiredPay'
                            className={classes.firstRow}
                            value={desiredPay}
                            required
                            disabled
                        />
                        <TextField
                            id='startDate'
                            label='Date you can start'
                            name='startDate'
                            className={classes.firstRow}
                            value={startDate}
                            type='date'
                            required
                            disabled
                        />
                        <TextField
                            id='position'
                            label='Position Desired'
                            name='position'
                            className={classes.firstRow}
                            value={position}
                            required
                            disabled
                        />
                    </div>
                    <div className={classes.middleContent}>
                        <div>
                            <Typography paragraph>Are you authorized to work in the United States?</Typography>
                            <FormControlLabel control={<Checkbox checked={authYes}/>}
                                              label='Yes' name='authYes' disabled/>
                            <FormControlLabel control={<Checkbox checked={authNo}/>}
                                              label='No' name='authNo' disabled/>
                        </div>

                        <div>
                            <Typography paragraph>Are you under 18 years of age?</Typography>
                            <FormControlLabel control={<Checkbox checked={under18Yes}/>}
                                              label='Yes' name='under18Yes' disabled/>
                            <FormControlLabel control={<Checkbox checked={under18No}/>}
                                              label='No' name='under18No' disabled/>
                        </div>
                        <div>
                            <Typography paragraph>If so, can you provide a work permit?</Typography>
                            <FormControlLabel control={<Checkbox checked={permitYes}/>}
                                              label='Yes' name='permitYes' disabled/>
                            <FormControlLabel control={<Checkbox checked={permitNo}/>}
                                              label='No' name='permitNo' disabled/>
                            <FormControlLabel control={<Checkbox checked={permitNA}/>}
                                              label='N/A' name='permitNA' disabled/>
                        </div>

                    </div>
                </form>
                <Typography paragraph>
                    Federal law requires that employers hire only individuals who are authorized to be lawfully
                    employed in the United States. In compliance with these laws, EMERGENCY ELECTRIC, INC
                    will verify the status of every individual offered employment with the Company. In this
                    connection, all offers of employment are subject to verification of the applicant's identity and
                    employment authorization, and it will be necessary for you to submit such documents as are
                    required by law to verify your identification and employment authorization.
                </Typography>
                <Divider className={classes.divider}/>
                <Typography variant='h4' className={classes.title}>Employment Section</Typography>
                {employment.map((item, id) => {
                    return (
                        <div key={item.id}>
                            <Typography className={classes.title} variant='h6'>{`Employer #${id + 1}`}</Typography>
                            <EmploymentFields values={item}/>
                            <Divider className={classes.divider}/>
                        </div>
                    )
                })}
                <Typography variant='h4' className={classes.title}>Education Section</Typography>
                {education.map((item, id) => {
                    return (
                        <div key={item.id}>
                            <Typography className={classes.title} variant='h6'>{`Education #${id + 1}`}</Typography>
                            <EducationFields values={item} />
                            <Divider className={classes.divider} />
                        </div>
                    )
                })}
            </Paper>
        </Container>
    )
}

export default ViewApplication;
