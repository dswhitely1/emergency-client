import React, {useContext, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import {useSelector} from "react-redux";
import ReferenceItem from './ReferenceItem';
import Header from '../shared/Header';
import {ActionsContext} from "../../../contexts/ActionsContext";

function ReferenceList() {
    const {reference} = useSelector(state => state.reference);
    const actions = useContext(ActionsContext);

    useEffect(()=> {
        actions.nav.drawerOff();
    }, [actions.nav])

    return (
        <Container maxWidth='lg'>
            <Header title='Reference' url='/dashboard/references/add-reference' />
            {reference.map(item => <ReferenceItem values={item} key={item.id}/>)}
        </Container>
    )
}

export default ReferenceList;
