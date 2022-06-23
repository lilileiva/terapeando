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
        else if(lowerCaseMessage.includes("perro")){
            this.actionProvider.handleDog();
        }
        else if(lowerCaseMessage.includes("gato")){
            this.actionProvider.handleCat();
        }
        else if(lowerCaseMessage.includes("menu") || lowerCaseMessage.includes("volver")){
            this.actionProvider.handleMenu()
        }
        else if(lowerCaseMessage.includes("contactanos")){
            this.actionProvider.handleHire();
        }
        else if(lowerCaseMessage.includes("cool") || lowerCaseMessage.includes("impresionante") || 
        lowerCaseMessage.includes("genial")){
            this.actionProvider.handleCool();
        }
        else if (lowerCaseMessage.includes("amo")) {
            this.actionProvider.handleLove()
        }
        else if (lowerCaseMessage.includes("precio") ||
        lowerCaseMessage.includes("valor") || lowerCaseMessage.includes("cuanto")) {
            this.actionProvider.handlePricing();
        }
        else if (lowerCaseMessage.includes("ok")|| lowerCaseMessage.includes("okey") || lowerCaseMessage.includes("vale") || lowerCaseMessage.includes("gracias")) {
            this.actionProvider.handleSomethingElse()
        } 
        else if(lowerCaseMessage.includes("contratar") || lowerCaseMessage.includes("trabajar")){
            this.actionProvider.handleHire();
        }
        else if(lowerCaseMessage.includes("servicios")){
            this.actionProvider.handleServicesList();
        }
        else if(lowerCaseMessage.includes("blog")){
            this.actionProvider.handleBlog();
        }
        else if(lowerCaseMessage.includes("cita")){
            this.actionProvider.handleSitePack1();
        }
        else if(lowerCaseMessage.includes("reservo") || lowerCaseMessage.includes("reservar")){
            this.actionProvider.handleSecion();
        }
        else if(lowerCaseMessage.includes("comodo") || lowerCaseMessage.includes("incomodo") || lowerCaseMessage.includes("queja")){
            this.actionProvider.handleQuejas()
        }
        else if(lowerCaseMessage.includes("adios") || lowerCaseMessage.includes("bye")){
            this.actionProvider.handleGoodbye();
        }
        else if(lowerCaseMessage.includes("matricula") || lowerCaseMessage.includes("aseguro" || lowerCaseMessage.includes("verifico"))){
            this.actionProvider.handleMatricula()
        }
        else if (lowerCaseMessage.includes("pago") || lowerCaseMessage.includes("metodos") || lowerCaseMessage.includes("formas")) {
            this.actionProvider.handlePagos()
        }
        else{
            this.actionProvider.handleSorry()
        }
    }
}
export default MessageParser