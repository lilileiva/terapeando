import React from "react";
import "./learningOptions.css"
import { Button} from "@chakra-ui/react";
const LearningOptions = (props) => {
    //empiezo con las opciones
    const options = [
        {
            text:"Servicios",
            handler: props.actionProvider.handleServicesList,
            id:1,
        }
    ]
    const optionsMarkup = options.map((option) => (
        <button className="learning-option-button" key={option.id} onClick={option.handler}>{option.text}</button>
    ));
    return (
        <div className="learning-options-container">
            {optionsMarkup}
        </div>
    )
}
export default LearningOptions