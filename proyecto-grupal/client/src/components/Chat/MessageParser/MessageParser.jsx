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
        else if(lowerCaseMessage.includes("contactanos") || lowerCaseMessage.includes("contacto")  || lowerCaseMessage.includes("terapeando")  || lowerCaseMessage.includes("email")){
            this.actionProvider.handleHire();
        }
        else if(lowerCaseMessage.includes("cool") || lowerCaseMessage.includes("impresionante") || 
        lowerCaseMessage.includes("genial")  || lowerCaseMessage.includes("capo")){
            this.actionProvider.handleCool();
        }
        else if (lowerCaseMessage.includes("amo")  || lowerCaseMessage.includes("quiero")) {
            this.actionProvider.handleLove()
        }
        else if (lowerCaseMessage.includes("precio") ||
        lowerCaseMessage.includes("valor") || lowerCaseMessage.includes("cuanto")  || lowerCaseMessage.includes("tarifa")  || lowerCaseMessage.includes("sesion")  || lowerCaseMessage.includes("sesión")) {
            this.actionProvider.handlePricing();
        }
        else if(lowerCaseMessage.includes("adios") || lowerCaseMessage.includes("bye") || lowerCaseMessage.includes("no") || lowerCaseMessage.includes("chau")){
            this.actionProvider.handleGoodbye();
        }
        else if (lowerCaseMessage.includes("ok")|| lowerCaseMessage.includes("okey") || lowerCaseMessage.includes("vale") || lowerCaseMessage.includes("gracias") || lowerCaseMessage.includes("bueno")) {
            this.actionProvider.handleSomethingElse()
        } 
        else if(lowerCaseMessage.includes("contratar") || lowerCaseMessage.includes("trabajar")){
            this.actionProvider.handleHire();
        }
        else if(lowerCaseMessage.includes("servicios") || lowerCaseMessage.includes("notas") || lowerCaseMessage.includes("posts") || lowerCaseMessage.includes("terapia")){
            this.actionProvider.handleServicesList();
        }
        else if(lowerCaseMessage.includes("blog")){
            this.actionProvider.handleBlog();
        }
        else if(lowerCaseMessage.includes("cita")){
            this.actionProvider.handleSitePack1();
        }
        else if(lowerCaseMessage.includes("reservo") || lowerCaseMessage.includes("reservar") || lowerCaseMessage.includes("agendar") || lowerCaseMessage.includes("cita")){
            this.actionProvider.handleSecion();
        }
        else if(lowerCaseMessage.includes("comodo") || lowerCaseMessage.includes("incomodo") || lowerCaseMessage.includes("queja")  || lowerCaseMessage.includes("reseña") || lowerCaseMessage.includes("review")){
            this.actionProvider.handleQuejas()
        }
        else if(lowerCaseMessage.includes("matricula") || lowerCaseMessage.includes("aseguro") || lowerCaseMessage.includes("verifico") || lowerCaseMessage.includes("psicologo") || lowerCaseMessage.includes("terapeuta") || lowerCaseMessage.includes("prefesional") || lowerCaseMessage.includes("universidad") || lowerCaseMessage.includes("licencia")){
            this.actionProvider.handleMatricula()
        }
        else if (lowerCaseMessage.includes("pago") || lowerCaseMessage.includes("metodos") || lowerCaseMessage.includes("formas") || lowerCaseMessage.includes("abonar") || lowerCaseMessage.includes("tarjeta")) {
            this.actionProvider.handlePagos()
        }else if(lowerCaseMessage.includes("mision")){
            this.actionProvider.includes("mision")
        }
        else{
            this.actionProvider.handleSorry()
        }
    }
}
export default MessageParser