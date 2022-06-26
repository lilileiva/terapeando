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
            "Fantastico, Estos son algunos de nuestros servicios ofrecidos ",{
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
    handleHire = () => {
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
    handleCool = () => {
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
        const message = this.createChatBotMessage("Una sesion con un psicologo en la plataforma cuesta $26 USD",{
            widget:"PriceFeedBack",
        });
        this.updateChatbotState(message);
    }
    handleSitePack2 = () => {
        const message = this.createChatBotMessage("Dos sesiones con el psicologo de tu preferencia en la plataforma cuesta $56 USD",{
            widget:"PriceFeedBack",
        });
        this.updateChatbotState(message);
    }
    handleSitePack3 = () => {
        const message = this.createChatBotMessage("Tres sesiones con el psicologo de tu preferencia en la plataforma cuesta $82 USD",{
            widget:"PriceFeedBack",
        });
        this.updateChatbotState(message);
    }
    handleSitePack4 = () => {
        const message = this.createChatBotMessage(
            "Cuatro sesiones con el psicologo de tu preferencia en la plataforma cuesta $108 USD",{
                widget:"PriceFeedBack"
            }
        );
        this.updateChatbotState(message)
    }
    handleMision = () => {
        const message = this.createChatBotMessage(
            "Brindamos los mejores profesionales y recursos para cuidarte. El primer paso siempre es el más dificil, registrate para empezar! Somos una plataforma psicológica online donde podes realizar sesiones a distancia como asi encontrar articulos escritos por los mismos profesionales."
        )
        this.updateChatbotState(message)
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
    handleDog = () => {
        const message = this.createChatBotMessage(
          "Serán de tus mejores compañeros y amigos en esta etapa 🥰",
          {
            widget: "dogPicture",
          }
        );
        this.updateChatbotState(message);
    };
    handleCat = () => {
        const message = this.createChatBotMessage(
          "Serán de tus mejores compañeros y amigos en esta etapa 🥰",
          {
            widget: "catPicture",
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
    handleSecion = () => {
        const message = this.createChatBotMessage(
            "En la parte superior de la pagina en la sección psicólogos puedes ver los que estan disponibles y agendar una sesión con el psicólogo de tu preferencia"
        )
        this.updateChatbotState(message)
    }
    handleQuejas = () => {
        const message = this.createChatBotMessage(
            "Puedes dar una reseña con el psicologo que tuviste la reunion donde tienes la opcion de calificarlo y poner tu opinion como una queja formal"
        )
        this.updateChatbotState(message)
    }
    handleMatricula = () => {
        const message = this.createChatBotMessage(
            "En terapeando nos encargamos de revisar que los psicólogos disponibles en el aplicativo tengan verificada y verídica su matricula para darle la mejor experiencia al cliente"
        )
        this.updateChatbotState(message)
    }
    handlePagos = () => {
        const message = this.createChatBotMessage(
            "En terapeando como metodos de pago tenemos Visa, Mastercard y American Express. De esta forma, con Stripe se optimiza las vías de enrutamiento, proporciona la información más detallada y disminuye la latencia en las transacciones."
        )
        this.updateChatbotState(message)
    }
    handleSorry = () => {
        const message = this.createChatBotMessage(
            "Lo siento, no lo entendí 😔, Por favor intenta seleccionar algunas de las siguientes opciones",{
                widget:"learningOptions"
            }
        )
        this.updateChatbotState(message)
    }
    
    updateChatbotState(message){
        //actualizamos elmensaje apartir del estado de lo que ingreseel usuario y no lo guardamos en el estado
        this.setState((prevState) => ({
            ...prevState,
            messages:[...prevState.messages, message]
        }))
    }
    
}
export default ActionProvider
