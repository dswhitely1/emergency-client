import React, {useContext, useEffect} from 'react';
import Container from '@material-ui/core/Container'
import {useSelector} from "react-redux";
import EmploymentItem from "./EmploymentItem";
import {ActionsContext} from "../../../contexts/ActionsContext";
import Header from "../shared/Header";

function EmploymentList() {
    const {employment} = useSelector(state => state.employment);
    const actions = useContext(ActionsContext);
    useEffect(() => {
        actions.nav.drawerOff();
    }, [actions.nav]);
    return (
        <Container maxWidth='lg'>
            <Header title='Employment' url='/dashboard/employment/add-employment'/>
            {employment.map(item => <EmploymentItem values={item} key={item.id}/>)}
        </Container>
    )
}

export default EmploymentList;
