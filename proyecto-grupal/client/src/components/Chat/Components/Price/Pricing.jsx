import React from "react";
import "./Princing.css";
const Pricing = (props) => {
    //agrego las opciones de precios
    const options = [
        {
            text:"Una sesión",
            handler: props.actionProvider.handleSitePack1,
            id:1
        },{
            text:"Dos sesiones",
            handler: props.actionProvider.handleSitePack2,
            id:2
        },{
            text:"Tres sesiones",
            handler: props.actionProvider.handleSitePack3,
            id:3
        },{
            text:"Cuatro sesiones",
            handler: props.actionProvider.handleSitePack4,
            id:4
        }
    ];
    //empiezo a mostrar las opciones
    const optionsMarkup = options.map((option) => {
        return(
            <button className="learning-option-button" key={option.id} onClick={option.handler}>
                {option.text}
            </button>
        )
    });
    //muestro todas las opciones
    return(
        <div className="learning-options-container">
            {optionsMarkup}
        </div>
    )
}
export default Pricing