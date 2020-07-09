import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import Typography from 'components/Typography/Typography';

function LandingPageNavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" flex noMargin>
          Emergency Electric Inc
        </Typography>
        <Typography noMargin>(502) 727-4823</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default LandingPageNavBar;
