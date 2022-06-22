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
            "Fantastico, Estos son algunos de nuestros servicios ofrecidos : ",{
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
    handleBlog = () => {
        const message = this.createChatBotMessage("Genial! Este es el blog",{
            widget:"blog"
        })
        this.updateChatbotState(message)
    }
    //para ver las diferentes comunicaciones de la plataforma
    hadleHire = () => {
        const message = this.createChatBotMessage("Genial! Estos son las opciones para contactarnos",{
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
    handleSitePack1 = () => {
        const message = this.createChatBotMessage("Una sesion en promedio con un psicologo de la plataforma cuesta $1000 USD",{
            widget:"PriceFeedBack",
        });
        this.updateChatbotState(message);
    }
    //psicologos
    handleWebsiteList = () => {
        const message = this.createChatBotMessage(
          "¿Qué tipo de psicologo necesita?",
          {
            widget: "website",
          }
        );
        this.updateChatbotState(message);
    };
    handlePricing = () => {
        const message = this.createChatBotMessage(
          "¿Qué tipo de servicio necesita?",
          {
            widget: "Pricing",
          }
        );
        this.updateChatbotState(message);
    };
    handleGoodbye = () => {
        const message = this.createChatBotMessage(
          "Fue divertido hablar contigo, cuídate, escribeme de nuevo cuando lo necesites"
        );
        this.updateChatbotState(message);
    };
    
    updateChatbotState(message){
        //actualizamos elmensaje apartir del estado de lo que ingreseel usuario y no lo guardamos en el estado
        this.setState((prevState) => ({
            ...prevState,
            messages:[...prevState.messages, message]
        }))
    }
    
}
export default ActionProvider