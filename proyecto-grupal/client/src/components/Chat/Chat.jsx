import React from 'react'
import Chatbot from 'react-chatbot-kit'
import "./Chat.css"
import config from './config/config.jsx';
import ActionProvider from './ActionProvider/ActionProvider.jsx';
import MessageParser from "./MessageParser/MessageParser.jsx"
function Chat(){
    return(
        <div className='Chat'>
            <header className='chat-header'>
                <Chatbot config={config} actionProvider={ActionProvider}
                messageParser={MessageParser}/>
            </header>
        </div>
    )
}
export default Chat