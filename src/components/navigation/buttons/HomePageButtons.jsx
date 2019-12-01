import React from 'react';
import {Button} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';

function HomepageButtons() {
    return <Button color='inherit' component={RouterLink} to='/login'>Apply Now!</Button>
}

export default HomepageButtons;
