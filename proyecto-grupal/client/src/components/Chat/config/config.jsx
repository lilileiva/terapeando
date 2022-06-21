import React from "react"
import {createChatBotMessage} from "react-chatbot-kit"
import LearningOptions from "../LearningOptions/LearningOptions.jsx"
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
    widgets:[
      {
        widgetName: "learningOptions",
        widgetFunc: (props) => <LearningOptions {...props} />,
      },
    ]
}
export default config;