import React from 'react'
import Chatbot from 'react-chatbot-kit'
import "./Chat.css"
import config from './config/config.jsx';
import ActionProvider from './ActionProvider/ActionProvider.jsx';
import MessageParser from "./MessageParser/MessageParser.jsx"
import { Box, SimpleGrid } from '@chakra-ui/react';

function Chat(){
    return(
        <div className='Chat'>
            <header className='chat-header'>
            <SimpleGrid columns={2}>
  <Box bg='tomato' height='300px' width={'500px'} >    <Chatbot 
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
                /></Box>
</SimpleGrid>
            
            </header>
        </div>
    )
}
export default Chat