import React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(()=>({
    position: {
        position: 'fixed',
        right: 100,
        top: 100,
        zIndex: 2000
    }
}))

function PhoneNumber() {
    const classes = useStyles();
    return <Button size='sm' className={classes.position} variant='contained' color='primary' href='tel:5027274823'>{`Emergency, Click to Call Now`}</Button>
}

export default PhoneNumber;
