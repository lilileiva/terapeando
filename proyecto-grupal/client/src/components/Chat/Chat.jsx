import React from 'react'
import {Chatbot} from 'react-chatbot-kit'
import "./Chat.css"
import config from './config/config.jsx';
import ActionProvider from './ActionProvider/ActionProvider.jsx';
import MessageParser from "./MessageParser/MessageParser.jsx"
import 'react-chatbot-kit/build/main.css';
function Chat(){
    return(
        <div className='App'>
            <header className='App-header'>
                <Chatbot
                    config={config}
                    actionProvider={ActionProvider}
                    messageParser={MessageParser}
                />
            </header>
        </div>
    )
}
export default Chat