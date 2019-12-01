import React, {useContext, useEffect, useState} from 'react';
import clsx from "clsx";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ActionsContext} from "../../contexts/ActionsContext";
import {Checkbox, Container, Divider, FormControlLabel, Paper, TextField, Typography} from "@material-ui/core";
import EmploymentFields from "../dashboard/employment/EmploymentFields";
import EducationFields from "../dashboard/education/EducationFields";
import ReferenceFields from "../dashboard/references/ReferenceFields";
import {parseDate} from "../utils/parseDate";
import {useStyles} from "../styles/useStyles";

function ViewApplication({values, employment, education, reference}) {
    const classes = useStyles();
    return (
        <Container maxWidth='lg'>
            <Paper className={classes.root}>
                <Typography variant='h5' className={clsx(classes.title, classes.appSpacing)}>Application for
                    Employment</Typography>
                <Typography paragraph>
                    EMERGENCY ELECTRIC, INC is an equal opportunity employer and does not discriminate
                    against any applicant or employee based on race, color, religion, sex, national origin,
                    disability, age, or military or veteran status in accordance with federal law. In addition,
                    EMERGENCY ELECTRIC, INC complies with applicable state and local laws governing nondiscrimination in
                    employment in every jurisdiction in which it maintains facilities.
                    EMERGENCY ELECTRIC, INC also provides reasonable accommodation to qualified
                    individuals with disabilities in accordance with applicable laws.
                </Typography>
                <Typography variant='h5' className={clsx(classes.title, classes.appSpacing)}>Personal Data</Typography>
                <form className={classes.formControl}>
                    <div className={classes.formRows}>
                        <TextField
                            className={classes.four}
                            required
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            value={values.firstName}

                        />
                        <TextField
                            id='middleName'
                            label='Middle Name'
                            name='middleName'
                            className={classes.four}
                            value={values.middleName}

                        />
                        <TextField
                            id='lastName'
                            label='Last Name'
                            name='lastName'
                            required
                            className={classes.four}
                            value={values.lastName}

                        />
                        <TextField
                            id='preferredName'
                            label='Preferred Name'
                            name='preferredName'
                            className={classes.four}
                            value={values.preferredName}

                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            id='address'
                            label="Address"
                            name='address'
                            required
                            className={classes.one}
                            value={values.address}
                        />
                        <TextField
                            id='address1'
                            label="Apartment or Suite"
                            name='address1'
                            className={classes.four}
                            value={values.address1}
                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            id='city'
                            label='City'
                            name='city'
                            className={classes.three}
                            required
                            value={values.city}

                        />
                        <TextField
                            id='state'
                            label='State'
                            name='state'
                            className={classes.three}
                            required
                            value={values.state}

                        />
                        <TextField
                            id='zipCode'
                            label='Zip Code'
                            name='zipCode'
                            className={classes.three}
                            required
                            value={values.zipCode}

                        />
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            id='phoneNumber'
                            label='Phone Number'
                            name='phoneNumber'
                            className={classes.three}
                            required
                            value={values.phoneNumber}

                        />
                        <TextField
                            id='altPhoneNumber'
                            label='Alternate Phone Number'
                            name='altPhoneNumber'
                            className={classes.three}
                            value={values.altPhoneNumber}

                        />
                        <TextField
                            id='email'
                            label='Email Address'
                            name='email'
                            className={classes.three}
                            required
                            value={values.email}

                        />
                    </div>
                    <div className={classes.formRows}>
                        <div>
                            <Typography variant='h6'>Are you interested in?</Typography>
                            <FormControlLabel control={<Checkbox checked={values.fullTime} />} label='Full Time'/>
                            <FormControlLabel control={<Checkbox checked={values.partTime} />} label='Part Time'/>
                            <FormControlLabel control={<Checkbox checked={values.temporary} />} label='Temporary'/>
                        </div>
                        <div>
                            <Typography variant='h6'>What schedule would you prefer?</Typography>
                            <FormControlLabel control={<Checkbox checked={values.weekdays} />} label='Weekdays'/>
                            <FormControlLabel control={<Checkbox checked={values.weekends} />} label='Weekends'/>
                            <FormControlLabel control={<Checkbox checked={values.evenings} />} label='Evenings'/>
                            <FormControlLabel control={<Checkbox checked={values.nights} />} label='Nights'/>
                        </div>
                    </div>
                    <div className={classes.formRows}>
                        <TextField
                            id='referredBy'
                            label='Referral'
                            name='referredBy'
                            className={classes.four}
                            value={values.referredBy}

                        />
                        <TextField
                            id='desiredPay'
                            label='Desired Pay'
                            name='desiredPay'
                            className={classes.four}
                            value={values.desiredPay}
                            required

                        />
                        <TextField
                            id='startDate'
                            label='Date you can start'
                            name='startDate'
                            className={classes.four}
                            value={parseDate(values.startDate)}
                            type='date'
                            required

                        />
                        <TextField
                            id='position'
                            label='Position Desired'
                            name='position'
                            className={classes.four}
                            value={values.position}
                            required

                        />
                    </div>
                    <div className={classes.formRows}>
                        <div>
                            <Typography paragraph>Are you authorized to work in the United States?</Typography>
                            <FormControlLabel control={<Checkbox checked={values.authYes}/>}
                                              label='Yes' name='authYes' />
                            <FormControlLabel control={<Checkbox checked={values.authNo}/>}
                                              label='No' name='authNo' />
                        </div>

                        <div>
                            <Typography paragraph>Are you under 18 years of age?</Typography>
                            <FormControlLabel control={<Checkbox checked={values.under18Yes}/>}
                                              label='Yes' name='under18Yes' />
                            <FormControlLabel control={<Checkbox checked={values.under18No}/>}
                                              label='No' name='under18No' />
                        </div>
                        <div>
                            <Typography paragraph>If so, can you provide a work permit?</Typography>
                            <FormControlLabel control={<Checkbox checked={values.permitYes}/>}
                                              label='Yes' name='permitYes' />
                            <FormControlLabel control={<Checkbox checked={values.permitNo}/>}
                                              label='No' name='permitNo' />
                            <FormControlLabel control={<Checkbox checked={values.permitNA}/>}
                                              label='N/A' name='permitNA' />
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
                <Typography variant='h4' className={clsx(classes.title, classes.appSpacing)}>Employment</Typography>
                {employment.map((item, id) => {
                    return (
                        <div key={item.id}>
                            <Typography className={clsx(classes.title, classes.appSpacing)}
                                        variant='h6'>{`Employer #${id + 1}`}</Typography>
                            <EmploymentFields values={item}/>
                            <Divider className={classes.divider}/>
                        </div>
                    )
                })}
                <Typography variant='h4' className={clsx(classes.title, classes.appSpacing)}>Education</Typography>
                {education.map((item, id) => {
                    return (
                        <div key={item.id}>
                            <Typography className={clsx(classes.title, classes.appSpacing)}
                                        variant='h6'>{`Education #${id + 1}`}</Typography>
                            <EducationFields values={item}/>
                            <Divider className={classes.divider}/>
                        </div>
                    )
                })}
                <Typography variant='h4' className={clsx(classes.title, classes.appSpacing)}>References</Typography>
                {reference.map((item, id) => {
                    return (
                        <div key={item.id}>
                            <Typography className={classes.title} variant='h6'>{`Reference #${id + 1}`}</Typography>
                            <ReferenceFields values={item}/>
                            <Divider className={classes.divider}/>
                        </div>
                    )
                })}
                <div className={classes.appSpacing}/>
                <Typography paragraph>
                    I have submitted the application to EMERGENCY ELECTRIC, INC for the sole purpose of
                    obtaining employment. I acknowledge that the use of this application, and my filling it out,
                    does not indicate that any positions are open, nor does it obligate EMERGENCY ELECTRIC,
                    INC to further process my application.
                </Typography>
                <Typography paragraph>
                    By clicking submit attests to the fact that the information that I have provided on my
                    application, resume, given verbally, or provided in any other materials, is true and complete
                    to the best of my knowledge and also constitutes authority to verify any and all information
                    submitted on this application. I understand that any misrepresentation or omission of any
                    fact in my application, resume, or any other materials, or doing any interviews, can be
                    justification fro refusal of employment, or if employed, termination from EMERGENCY
                    ELECTRIC, INC employment.
                </Typography>
                <Typography paragraph>
                    I understand that this application is not an employment contract for any specific length of
                    time between EMERGENCY ELECTRIC, INC and me, and that in the event I am hired, my
                    employment will be "at will" and either EMERGENCY ELECTRIC, INC or I can terminate my
                    employment with or without cause and with or without notice at any time. Nothing
                    contained in any handbook, manual, policy and the like, distributed by EMERGENCY
                    ELECTRIC, INC to its employees is intended to or can create an employment contract, an
                    offer of employment or any obligation on EMERGENCY ELECTRIC, INC part. EMERGENCY
                    ELECTRIC, INC may at its sole discretion, hold in abeyance or revoke, amend or modify,
                    abridge or change any benefit, policy practice, condition or process affecting its employees.
                </Typography>
                <Typography paragraph>
                    I hereby authorize EMERGENCY ELECTRIC, INC and its agents to make such investigations
                    and inquiries into my employment and education history and other related matters as may
                    be necessary in arriving at an employment decision. I hereby release employers, schools,
                    and other persons from all liability in responding to inquires connected with my application
                    and I specifically authorize the release of information by any schools, businesses, individuals,
                    services or other entities listed by me in this form. Furthermore, I authorize the company
                    and its agents to release any reference information to clients who request such information
                    for purposes of evaluating my credentials and qualifications.
                </Typography>

            </Paper>
        </Container>
    )
}

export default ViewApplication;
