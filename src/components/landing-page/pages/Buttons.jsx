import React from 'react';
import {Button, IconButton} from "@material-ui/core";
import Scrollchor from 'react-scrollchor';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {ButtonContainer} from "../styles/customStyles";

function Buttons({color, link, desc}) {
    return (
        <ButtonContainer>
            <Button color={color} variant="contained" component={Scrollchor} to={link}>{desc}</Button>
            <IconButton aria-label="Scroll To Top" color={color} component={Scrollchor}
                        to='#root'><ArrowUpwardIcon/></IconButton>
        </ButtonContainer>
    )
}

export default Buttons
