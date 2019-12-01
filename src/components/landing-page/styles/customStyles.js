import styled, {css} from 'styled-components';
import headerImage from '../../../assests/electrical-electrician-electricity-1435183.jpg';
import {Container, Paper, TextField, Typography} from "@material-ui/core";

export const Section = styled.section`
  padding: 8rem 0;
  h2 {
    font-size: 3rem;
  }
  
  h3 {
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  
  ${props => props.inverted && css`
    background-color: #351a1a;
    color: #b48a66;
  `}
  
  ${props => props.header && css`
        min-height: 30rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
        background: linear-gradient(90deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 100%),url(${headerImage});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        
        @media (min-width: 992px) {
          height: 100vh;
        }        
  `}
`;

export const StyledContainer = styled(Container)`
    text-align: center;
    
    ${props => props.description && css`
      width: 83% !important;
    `}
`;

export const StyledTypography = styled(Typography)`
    margin-bottom: 24px !important;
    
    ${props => props.header && css`
      font-weight: bolder !important;
    `}
    ${props => props.spacing && css`
      margin: 0 !important;
      padding-top: 32px;
    `}  
    ${props => props.noMargin && css`
        margin: 0 !important;
    `}
    
    ${props => props.title && css`
        text-transform: uppercase;
        margin: 16px 0;
    `}
`;

export const Image = styled.img`
  padding: .25rem;
  background-color: #fff;
  border: 1px solid #dee236;
  border-radius: 1rem;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  margin: 16px auto;
`;

export const StyledPaper = styled(Paper)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  margin: 24px 0;
  
  ${props => props.form && css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `}
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  
  @media (min-width: 992px) {
    ${props => props.two && css`width: calc(50% - 8px);`}
    ${props => props.three && css`width: calc(33% - 8px);`}
    ${props => props.four && css`width: calc(25% - 8px);`}
  }  
  
`;

export const Form = styled.form`
  display: flex,
  flex-direction: column;
  margin: 16px 0;
`;

export const FormRows = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StyledFooter = styled.footer`
  ${props => props.inverted && css`
    padding: 32px 0 0;
    background-color: #222222;
    color: #b48a66;
  `}
`;