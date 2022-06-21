class MessageParser{
    constructor(actionProvider){
        this.actionProvider = actionProvider
    }
    //aqui vamos a mirar y a responder lo que pone el usuario
    parse(message){
        const lowerCaseMessage = message.toLowerCase();
        //en el caso de que sea hola respondemos con la funcion greet
        if(lowerCaseMessage.includes("hola")){
            this.actionProvider.greet();
        }
        if(lowerCaseMessage.includes("menu") || lowerCaseMessage.includes("volver")){
            this.actionProvider.handleMenu(9)
        }
        if(lowerCaseMessage.includes("contactanos")){
            this.actionProvider.handleHire();
        }
        if(lowerCaseMessage.includes("cool") || lowerCaseMessage.includes("awesome") || 
        lowerCaseMessage.includes("amazing")){
            this.actionProvider.handleCool();
        }
        if (lowerCaseMessage.includes("amo")) {
            
        }
        if (lowerCaseMessage.includes("precio") ||
        lowerCaseMessage.includes("valor") || lowerCaseMessage.includes("cuanto cuesta")) {
            this.actionProvider.handlePricing();
        }
        if (lowerCaseMessage.includes("ok") || lowerCaseMessage.incluide("okey") || lowerCaseMessage.includes("vale") || lowerCaseMessage.includes("gracias")) {
            this.actionProvider.handleSomethingElse()
        } 
    }
}
export default MessageParser