import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import ReferenceItem from './ReferenceItem';
import Header from '../shared/Header';
import { ActionsContext } from '../../../contexts/ActionsContext';
import NavigationLinks from '../shared/NavigationLinks';

function ReferenceList() {
  const { reference } = useSelector((state) => state.reference);
  const actions = useContext(ActionsContext);

  useEffect(() => {
    actions.nav.drawerOff();
  }, [actions.nav]);

  return (
    <Container maxWidth="lg">
      <NavigationLinks
        currentTitle="Reference"
        prevTitle="Education"
        nextTitle="Submit Application"
        nextUrl="/dashboard"
        prevUrl="/dashboard/education"
      />
      <Header title="Reference" url="/dashboard/references/add-reference" />
      {reference.map((item) => (
        <ReferenceItem values={item} key={item.id} />
      ))}
    </Container>
  );
}

export default ReferenceList;
