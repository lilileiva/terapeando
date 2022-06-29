import React, {useState}from 'react'
import {Chatbot} from 'react-chatbot-kit'
import "./Chat.css"
import config from './config/config.jsx';
import ActionProvider from './ActionProvider/ActionProvider.jsx';
import MessageParser from "./MessageParser/MessageParser.jsx"
import avatar from "../../assets/logo-01.png"
import 'react-chatbot-kit/build/main.css';
function Chat(){
    //me creo un estado para mostrar el chat o no
    const [showChat, toggleChat] = useState(false)

    const saveMessages = (messages, HTMLString) => {
        localStorage.setItem('chat_message', JSON.stringify(messages))
    }
    
    const loadMessages = () => {
        const messages =JSON.parse(localStorage.getItem('chat_messages'));
        return messages
    }

    return(
        <div className='chatApp'>
                {showChat && (
                    <div className="chat">
                        <Chatbot
                            config={config}
                            actionProvider={ActionProvider}
                            messageHistory={loadMessages}
                            messageParser={MessageParser}
                            saveMessages={saveMessages}
                        />
                    </div>
                    )
                }
                <button className='chat-button' onClick={() => toggleChat((prev) => !prev)}>
                    <img className='chat-img' src={avatar} alt="logo" />
                </button>
        </div>
    )
}
export default Chat