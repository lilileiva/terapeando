import React from 'react'
import Chatbot from 'react-chatbot-kit'
import config from './config.jsx';
function Chat(){
    return(
        <div>
            <h1>Soy el chat</h1>
            <Chatbot config={config}/>
        </div>
    )
}
export default Chat