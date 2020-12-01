import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import EducationItem from './EducationItem';
import Header from '../shared/Header';
import { ActionsContext } from '../../../contexts/ActionsContext';
import NavigationLinks from '../shared/NavigationLinks';

function EducationList() {
  const { education } = useSelector((state) => state.education);
  const actions = useContext(ActionsContext);

  useEffect(() => {
    actions.nav.drawerOff();
  }, [actions.nav]);

  return (
    <Container maxWidth="lg">
      <NavigationLinks
        currentTitle="Education"
        prevTitle="Employment History"
        nextTitle="References"
        nextUrl="/dashboard/references"
        prevUrl="/dashboard/employment"
      />
      <Header title="Education" url="/dashboard/education/add-education" />
      {education.map((item) => (
        <EducationItem key={item.id} values={item} />
      ))}
    </Container>
  );
}

export default EducationList;
