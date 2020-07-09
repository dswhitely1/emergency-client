import React from 'react';
import { useSelector } from 'react-redux';
import { StyledContainer } from '../../landing-page/styles/customStyles';
import Message from './Message';

function AdminMessage() {
  const { messages } = useSelector((state) => state.admin);
  return (
    <StyledContainer maxWidth="lg">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </StyledContainer>
  );
}

export default AdminMessage;
