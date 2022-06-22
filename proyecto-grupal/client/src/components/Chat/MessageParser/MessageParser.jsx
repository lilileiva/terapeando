class MessageParser{
    constructor(actionProvider){
        this.actionProvider = actionProvider
    }
    //aqui vamos a mirar y a responder lo que pone el usuario
    parse(message){
        const lowerCaseMessage = message.toLowerCase();
        console.log(lowerCaseMessage)
        //en el caso de que sea hola respondemos con la funcion greet
        if(lowerCaseMessage.includes("hola")){
            this.actionProvider.greet();
        }
        if(lowerCaseMessage.includes("menu") || lowerCaseMessage.includes("volver")){
            this.actionProvider.handleMenu()
        }
        if(lowerCaseMessage.includes("contactanos")){
            this.actionProvider.handleHire();
        }
        if(lowerCaseMessage.includes("cool") || lowerCaseMessage.includes("impresionante") || 
        lowerCaseMessage.includes("genial")){
            this.actionProvider.handleCool();
        }
        if (lowerCaseMessage.includes("amo")) {
            this.actionProvider.handleLove()
        }
        if (lowerCaseMessage.includes("precio") ||
        lowerCaseMessage.includes("valor") || lowerCaseMessage.includes("cuanto")) {
            this.actionProvider.handlePricing();
        }
        if (lowerCaseMessage.includes("ok")|| lowerCaseMessage.includes("okey") || lowerCaseMessage.includes("vale") || lowerCaseMessage.includes("gracias")) {
            this.actionProvider.handleSomethingElse()
        } 
        if(lowerCaseMessage.includes("contratar") || lowerCaseMessage.includes("trabajar")){
            this.actionProvider.handleHire();
        }
        if(lowerCaseMessage.includes("servicios")){
            this.actionProvider.handleServicesList();
        }
        if(lowerCaseMessage.includes("blog")){
            this.actionProvider.handleBlog();
        }
        if(lowerCaseMessage.includes("cita")){
            this.actionProvider.handleSitePack1();
        }
        if(lowerCaseMessage.includes("reservo") || lowerCaseMessage.includes("reservar")){
            this.actionProvider.handleSecion();
        }
        if(lowerCaseMessage.includes("comodo") || lowerCaseMessage.includes("incomodo") || lowerCaseMessage.includes("queja")){
            this.actionProvider.handleQuejas()
        }
        if(lowerCaseMessage.includes("adios") || lowerCaseMessage.includes("bye")){
            this.actionProvider.handleGoodbye();
        }
    }
}
export default MessageParser