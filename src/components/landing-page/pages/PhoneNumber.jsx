import React from 'react';
import { PhoneEnabled } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { StyledEmergencyButton } from '../styles/customStyles';

function PhoneNumber() {
  return (
    <Tooltip title="Have an emergency, click to call">
      <StyledEmergencyButton color="primary" href="tel:5027274823">
        <PhoneEnabled />
      </StyledEmergencyButton>
    </Tooltip>
  );
}

export default PhoneNumber;
