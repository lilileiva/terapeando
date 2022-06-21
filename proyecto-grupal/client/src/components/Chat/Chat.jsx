import React from 'react'
import Chatbot from 'react-chatbot-kit'
import config from './config.jsx';
import ActionProvider from './ActionProvider.jsx';
import MessageParser from "./MessaseParser.jsx"
function Chat(){
    return(
        <div>
            <h1>Soy el chat</h1>
            <Chatbot config={config} actionProvider={ActionProvider}
            messageParser={MessageParser}/>
        </div>
    )
}
export default Chat