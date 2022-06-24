import React from 'react'
import {Chatbot} from 'react-chatbot-kit'
import "./Chat.css"
import config from './config/config.jsx';
import ActionProvider from './ActionProvider/ActionProvider.jsx';
import MessageParser from "./MessageParser/MessageParser.jsx"
import avatar from "../../assets/logo-01.png"
import 'react-chatbot-kit/build/main.css';
function Chat(){
    return(
        <div className='chatApp'>
            <header className='chatApp-header'>
                <Chatbot
                    config={config}
                    actionProvider={ActionProvider}
                    messageParser={MessageParser}
                />
                <img className='chat-img' src={avatar} alt="logo" />
            </header>
        </div>
    )
}
export default Chat