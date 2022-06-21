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
        // if(lowerCaseMessage.includes("contactanos")){
        //     this.actionProvider.handleHire();
        // }
        // if(lowerCaseMessage.includes("cool") || lowerCaseMessage.includes("awesome") || 
        // lowerCaseMessage.includes("amazing")){
        //     this.actionProvider.handleCool();
        // }
        // if (lowerCaseMessage.includes("amo")) {
            
        // }
        // if (lowerCaseMessage.includes("precio") ||
        // lowerCaseMessage.includes("valor") || lowerCaseMessage.includes("cuanto cuesta")) {
        //     this.actionProvider.handlePricing();
        // }
        // if (lowerCaseMessage.includes("ok")|| lowerCaseMessage.includes("okey") || lowerCaseMessage.includes("vale") || lowerCaseMessage.includes("gracias")) {
        //     this.actionProvider.handleSomethingElse()
        // } 
        // if(lowerCaseMessage.includes("contratar") || lowerCaseMessage.incluides("trabajar para ti")){
        //     this.actionProvider.handleHire();
        // }
        // if(lowerCaseMessage.includes("servicios")){
        //     this.actionProvider.handleServicesList();
        // }
        // if(lowerCaseMessage.includes("blog")){
        //     this.actionProvider.handleBlog();
        // }
        // if(lowerCaseMessage.includes("cita")){
        //     this.actionProvider.handleSitePack1();
        // }
    }
}
export default MessageParser