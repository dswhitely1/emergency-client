import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {useStyles} from "../../styles/useStyles";

const useStyles2 = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(3)
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
    four: {
        width: 'calc(25% - 10px)'
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

function ReferenceFields({values}) {
    const classes = useStyles();
    return (
        <div className={classes.formRows}>
            <TextField className={classes.four} required label='Name' value={values.name} disabled />
            <TextField className={classes.four} required label='Relationship' value={values.relationship} disabled />
            <TextField className={classes.four} required label='Years Known' value={values.years} disabled />
            <TextField className={classes.four} required label='PhoneNumber' value={values.phoneNumber} disabled />
        </div>
    )
}

export default ReferenceFields;
