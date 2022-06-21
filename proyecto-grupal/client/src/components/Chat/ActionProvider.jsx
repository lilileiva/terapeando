class ActionProvider{
    constructor(createChatBotMessage, setStateFunc){
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }
    greet(){
        const greetingMessage = this.createChatBotMessage("Hola, Amigo");
        this.updateChatbotState(greetingMessage);
    }
    //la lista de ls servicios en el chat
    handleServicesList = () => {
        const message = this.createChatBotMessage(
            "Fantastico, Estos sn algunos de nuestros servicios ofrecidos : ",{
                widget:"servicesLinks"
            }
        );
        this.updateChatbotState(message);
    };
    //por si dice te amo jaja
    handleLove = () => {
        const message = this.createChatBotMessage("Te amo tambien!")
        this.updateChatbotState(message);
    }
    //para ver las diferentes comunicaciones de la plataforma
    hadleHire = () => {
        const message = this.createChatBotMessage("Genial! Ests son las opciones para contactarnos",{
            widget:"contactLinks"
        })
        this.updateChatbotState(message)
    }
    //para el menu
    handleMenu = () => {
        const message = this.createChatBotMessage(
            "Buen día amigo, ¿Puedo ayudarte en algo?",{
                widget:"learningOptions"
            }
        );
        this.updateChatbotState(message)
    }
    //por si esta cool
    HandleCool = () => {
        const message = this.createChatBotMessage(
          "También eres genial para ser un humano, ¡Vive mucho y prospera!"
        );
        this.updateChatbotState(message);
    };
    //por si quiere algo mas
    handleSomethingElse = () => {
        const message = this.createChatBotMessage("¿Necesitas algo más?",{
            widget:"Back"
        });
        this.updateChatbotState(message)
    }
}
export default ActionProvider