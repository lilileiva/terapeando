import React from "react"
import {createChatBotMessage} from "react-chatbot-kit"
const config = {
    botName: "TereBot",
    initialMessages:[
        createChatBotMessage("Hola, Soy Tere Bot. ¿Como puedo ayudarte el dia de hoy? ",{
            widget:"learningOptions"
        }),
    ],
    customStyles: {
        botMessageBox: {
          backgroundColor: "#d00000",
        },
        chatButton: {
          backgroundColor: "#d00000",
        },
    },
}
export default config;