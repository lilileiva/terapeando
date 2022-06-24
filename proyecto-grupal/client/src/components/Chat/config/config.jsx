import React from "react"
import {createChatBotMessage} from "react-chatbot-kit"
import LearningOptions from "../LearningOptions/LearningOptions.jsx"
import LinkList from "../Components/LinkList/Linklist.jsx"
import Avatar from "../Components/Avatar/Avatar"
import Pricing from "../Components/Price/Pricing.jsx"
import PriceFeedBack from "../Components/Price/PriceFeedBack.jsx"
import DogPicture from './dogPicture'
import CatPicture from './catPicture'
const config = {
    botName: "TereBot",
    initialMessages:[
        createChatBotMessage("Hola, Soy Tere Bot. ¿Como puedo ayudarte el dia de hoy? ",{
            widget:"learningOptions",
            withAvatar: true
        }),
    ],
    customStyles: {
        botMessageBox: {
          backgroundColor: "#376B7E",
        },
        chatButton: {
          backgroundColor: "#5ccc9d",
        },
        

    },
    widgets:[
      {  
        widgetName: 'dogPicture',
        widgetFunc: (props) => <DogPicture {...props} />,    
      },
      {  
        widgetName: 'catPicture',
        widgetFunc: (props) => <CatPicture {...props} />,    
      },
      {
        widgetName: "learningOptions",
        widgetFunc: (props) => <LearningOptions {...props} />,
      },{
        widgetName:"Pricing",
        widgetFunc: (props) => <Pricing {...props}/>
      },{
        widgetName:"PriceFeedBack",
        widgetFunc: (props) => <PriceFeedBack {...props}/>
      },{
        widgetName: "Back",
        widgetFunc: (props) => <LearningOptions {...props}/>
      },{
        widgetName:"servicesLinks",
        widgetFunc: (props) => <LinkList {...props}/>,
        props:{
          options:[
            {
              text:"Psicologia",
              url:"http://localhost:3000/home",
              id:1,
            },{
              text:"Blog de Psicologia",
              url:"http://localhost:3000/blog",
              id:3
            }
          ]
        }
      },//muestro las opciones de contacto a travez del componente link list
      {
        widgetName:"contactLinks",
        widgetFunc: (props) => <LinkList {...props}/>,
        props:{
          options:[
            {
              text:"Sitio Web",
              url:"http://localhost:3000",
              id:1,
            },{
              text: "Email",
              url:"mailto:terapeando@gmail.com?Subject=ChatBot Query",
              id:2
            }
          ]
        }
      }
    ],
    customComponents: {
      // remplaso el avatar defualt de chatbot
      botAvatar: (props) => <Avatar {...props} />,
    },
  }
export default config;