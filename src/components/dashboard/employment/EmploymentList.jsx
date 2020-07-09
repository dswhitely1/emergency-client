import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import EmploymentItem from './EmploymentItem';
import { ActionsContext } from '../../../contexts/ActionsContext';
import Header from '../shared/Header';
import NavigationLinks from '../shared/NavigationLinks';

function EmploymentList() {
  const { employment } = useSelector((state) => state.employment);
  const actions = useContext(ActionsContext);
  useEffect(() => {
    actions.nav.drawerOff();
  }, [actions.nav]);
  return (
    <Container maxWidth="lg">
      <NavigationLinks
        currentTitle="Employment History"
        nextTitle="Education"
        prevTitle="Profile"
        prevUrl="/dashboard/profile"
        nextUrl="/dashboard/education"
      />
      <Header title="Employment" url="/dashboard/employment/add-employment" />
      {employment.map((item) => (
        <EmploymentItem values={item} key={item.id} />
      ))}
    </Container>
  );
}

export default EmploymentList;
