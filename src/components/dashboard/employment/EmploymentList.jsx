import React, {useContext, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import EmploymentItem from "./EmploymentItem";
import {ActionsContext} from "../../../contexts/ActionsContext";

const useStyles = makeStyles(theme=> ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

function EmploymentList() {
    const classes = useStyles();
    const {employment} = useSelector(state => state.employment);
    const actions = useContext(ActionsContext);
    useEffect(() => {
        actions.nav.drawerOff();
    }, [actions.nav]);
    return (
        <Container maxWidth='lg'>
            <Paper className={classes.root}>
                <Typography variant='h5'>Employment List</Typography>
                <Button color='primary' component={RouterLink} to='/dashboard/employment/add-employment'>Add New
                    Employment</Button>
            </Paper>
            {employment.map(item => <EmploymentItem values={item} key={item.id}/>)}
        </Container>
    )
}

export default EmploymentList;
