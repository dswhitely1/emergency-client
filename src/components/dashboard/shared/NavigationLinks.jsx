import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Paper} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    navButtons: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
            flexDirection: 'row'
        }
    }
}));

function NavigationLinks({prevUrl, nextUrl, prevTitle, nextTitle, currentTitle}) {
    const classes = useStyles();
    return (
        <Paper className={classes.navButtons}>
            <Button color='primary' component={RouterLink} to={prevUrl}>{prevTitle}</Button>
            <Button color='primary'>{currentTitle}</Button>
            <Button color='primary' component={RouterLink} to={nextUrl}>{nextTitle}</Button>
        </Paper>
    )
}

export default NavigationLinks;
