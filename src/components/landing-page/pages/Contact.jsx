import React from 'react';
import {useForm} from "../../../hooks/useForm";
import {
    Section,
    StyledContainer,
    StyledTypography,
    Form,
    StyledTextField,
    FormRows,
    ButtonContainer
} from "../styles/customStyles";

import {Button, IconButton} from "@material-ui/core";
import Scrollchor from "react-scrollchor";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function Contact() {
    const [values, change, submit, reset] = useForm({
        firstName: '',
        lastName: '',
        contact: '',
        subject: '',
        message: ''
    }, doSubmit);

    function doSubmit() {
        console.log(values);
    }

    return (
        <Section>
            <StyledContainer maxWidth='lg' description>
                <StyledTypography variant='h3'>Contact Us</StyledTypography>
                <StyledTypography variant='h2'>Send Us a Message!</StyledTypography>
                <Form onSubmit={submit}>
                    <FormRows>
                    <StyledTextField
                        three
                        name='firstName'
                        label='First Name'
                        onChange={change}
                        id='firstName'
                        required
                        autoFocus
                    />
                    <StyledTextField
                        three
                        name='lastName'
                        label='Last Name'
                        onChange={change}
                        id='lastName'
                        required
                    />
                    <StyledTextField
                        three
                        name='contact'
                        id='contact'
                        label='Email or Phone Number'
                        onChange={change}
                        required
                    />
                    </FormRows>
                    <FormRows>
                        <StyledTextField
                            name='subject'
                            onChange={change}
                            id='subject'
                            label='Subject'
                            required
                        />
                    </FormRows>
                    <FormRows>
                        <StyledTextField
                            multiline
                            name='message'
                            id='message'
                            label='Message'
                            required
                            onChange={change}
                        />
                    </FormRows>
                    <ButtonContainer form>
                        <Button color='primary' onClick={reset} disabled>Reset</Button>
                        <Button color='primary' type='submit' disabled>Submit</Button>
                        <IconButton aria-label="Scroll To Top" color='primary' component={Scrollchor}
                                    to='#root'><ArrowUpwardIcon/></IconButton>
                    </ButtonContainer>
                </Form>
            </StyledContainer>
        </Section>
    )
}


export default Contact;
