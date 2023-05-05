import React from 'react'; 
import MessagesLayout from '../../components/MessagesLayout';
import ChatHolder from '../../components/ChatHolder';
import { Container } from 'react-bootstrap';

const MessagesPage = () => {
    return (
        <Container>
        <MessagesLayout />
        <ChatHolder />
        </Container>
    );
}

export default MessagesPage;