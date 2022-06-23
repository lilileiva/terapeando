import "./Princing.css"
const PriceFeedBack = (props) => {
    //tengo las opciones en un array
    const options = [
        {
            text:"Mision",
            handler: props.actionProvider.handleMision,
            id:1
        },{
            text:"Pagos",
            handler: props.actionProvider.handlePagos,
            id:2
        },{
            text:"Contacto",
            handler: props.actionProvider.handleHire,
            id:3
        },{
            text:"Volver",
            handler: props.actionProvider.handleSomethingElse,
            id:4
        }
    ]
    //me guardo todas las opciones renderizadas en la variable
    const optionsMarup = options.map((option) => {
        return(
            <button className="learning-option-button" key={option.id} onClick={option.handler}>
                {option.text}
            </button>
        )
    })
    //muestro las opciones disponibles
    return(
        <div className="learning-options-container">{optionsMarup}</div>
    )
}
export default PriceFeedBack