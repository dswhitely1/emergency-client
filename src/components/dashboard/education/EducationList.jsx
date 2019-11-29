import React, {useContext, useEffect} from 'react';
import EducationItem from "./EducationItem";
import Container from "@material-ui/core/Container";
import Header from "../shared/Header";
import {useSelector} from "react-redux";
import {ActionsContext} from "../../../contexts/ActionsContext";

function EducationList() {
    const {education} = useSelector(state => state.education);
    const actions = useContext(ActionsContext);

    useEffect(() => {
        actions.nav.drawerOff();
    }, [actions.nav]);

    return (
        <Container maxWidth='lg'>
            <Header title='Education' url='/dashboard/education/add-education'/>
            {education.map(item => <EducationItem key={item.id} values={item}/>)}
        </Container>
    )
}

export default EducationList;
