import React from 'react';
import { StyledEmergencyButton } from '../styles/customStyles';

function PhoneNumber() {
  return (
    <StyledEmergencyButton
      size="small"
      variant="contained"
      color="primary"
      href="tel:5027274823"
    >
      Emergency, Click to Call Now
    </StyledEmergencyButton>
  );
}

export default PhoneNumber;
