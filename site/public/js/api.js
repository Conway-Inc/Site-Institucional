let nome = "";
let etapa = 0;
let cliente = true;
let areaBusway = true;

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variavel para a mensagem
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Cria no chat um LI onde coloca a class "className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // retorna o elemento LI
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Obtenha a mensagem inserida pelo usuário e remova o espaço em branco extra
    if (!userMessage) return;

    // Limpe a área de texto de entrada e defina sua altura como padrão
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Anexar a mensagem do usuário ao chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Exibir a mensagem de resposta do bot
    setTimeout(() => {

        if (etapa == 0) {//se for a 1° vez vou pegar o nome da pessoa
            nome = userMessage;
            var incomingChatLi = createChatLi(`Seja bem vindo(a) ${nome}, primeiro quero saber qual público você pertence, digite:\n [1] Já sou cliente \n [2] Ainda não sou cliente`, "incoming");
            etapa = 1;
        } else {
            if (etapa == 1) {
                etapa = 2;
                if (userMessage == 1) {
                    var incomingChatLi = createChatLi("Digite o número da opção que mais lhe ajuda.\n[1] Quero contratar novos serviços\n[2] Estou com problemas na AirWay\n[3] Estou com problemas na BusWay", "incoming");
                    cliente = true;
                } else if (userMessage == 2) {
                    var incomingChatLi = createChatLi("Digite o número da opção que mais lhe ajuda.\n[1] Quero contratar novos serviços\n[2] Estou com dúvidas em relação a AirWay\n[3] Estou com dúvidas em relação a BusWay", "incoming");
                    cliente = false;
                } else {
                    etapa = 1;
                    var incomingChatLi = createChatLi("Por favor digite um número válido!", "incoming");
                }
            } else if (etapa == 2) {

                etapa = 3;

                if (cliente == true) { //se ele for cliente acontece isso
                    if (userMessage == 1) {

                        var incomingChatLi = createChatLi("Que legal! Para entrar em contato com nosco basta enviar um formulário clicando neste link 'LINK' depois disso entraremos em contato para fecharmos um acordo!", "incoming");

                    } else if (userMessage == 2) {

                        areaBusway = false;
                        var incomingChatLi = createChatLi("Puxa vida, que pena que encontrou problemas na AirWay, digite abaixo a opção que mais se encaixa no problema:\n[1] Meu Login não funciona\n[2] Não consigo cadastrar novos usuários\n[3] O sistema está fora do ar\n[4] Os alertas não estão aparecendo\n[5] Meus totens não estão aparecendo\n[6] Outro problema", "incoming");

                    } else if (userMessage == 3) {

                        areaBusway = true;
                        var incomingChatLi = createChatLi("Puxa vida, que pena que encontrou problemas na AirWay, digite abaixo a opção que mais se encaixa no problema:\n[1] Meu Login não funciona\n[2] Não consigo cadastrar novos usuários\n[3] O sistema está fora do ar\n[4] Não consigo cadastrar novas rotas\n[5] Meus ônibus não estão aparecendo\n[6] Outro problema", "incoming");

                    } else {
                        etapa = 2;
                        var incomingChatLi = createChatLi("Por favor digite um número válido!", "incoming");
                    }
                } else { //se não for cliente acontece isso

                    if (userMessage == 1) {
                        var incomingChatLi = createChatLi("Que legal! Para entrar em contato com nosco basta enviar um formulário clicando neste link 'LINK' depois disso entraremos em contato para fecharmos um acordo!", "incoming");
                    } else if (userMessage == 2 || userMessage == 3) {
                        var incomingChatLi = createChatLi("Certo! Digite abaixo a opção que mais se encaixa na sua dúvida:\n[1] Posso acessar o sistema de qualquer lugar?\n[2] Vocês tem uma equipe de suporte?\n[3] Outra dúvida", "incoming");
                    } else {
                        etapa = 2;
                        var incomingChatLi = createChatLi("Por favor digite um número válido!", "incoming");
                    }
                
                }
            } else if (etapa == 3) {

                etapa = 4;

                if (cliente == true) {
                    if (areaBusway == true) {

                        if (userMessage == 1) {
                        
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Verifique se seu email e senha estão corretos\n3. Feche o site e tente novamente\n4. Caso os erros persistam mande mensagem no nosso suporte", "incoming");
                        
                        } else if (userMessage == 2) {
                        
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Verifique se já está logado no site\n3. Tente cadastrar por meio de outro email\n4. Caso os erros persistam mande mensagem no nosso suporte");
                        
                        } else if (userMessage == 3) {
                        
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Tente com outro computador\n3. Tente abrir uma nova guia e acessar o site\n4. Caso os erros persistam mande mensagem no nosso suporte");
                        
                        } else if (userMessage == 4) {

                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Tente com outro computador\n3. Tente abrir uma nova guia e acessar o site\n4. Verifique se seu email tem acesso a essa função\n5. Verifique se está conectado no site\n 6. Caso os erros persistam mande mensagem no nosso suporte");
                            
                        } else if (userMessage == 5) {
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Tente cadastrar um novo ônibus\n3. Tente abrir uma nova guia e acessar o site\n4. Tenha certeza que está logado corretamente no site\n5. Caso os erros persistam mande mensagem no nosso suporte");
                            
                        } else if (userMessage == 6) {
                            var incomingChatLi = createChatLi("Puxa vida, que pena que não consegui resolver seu problema :(\n Entre em contato com nossa equipe de suporte relatando-o para podermos ajudar.", "incoming");
                        } else {
                            etapa = 3;
                            var incomingChatLi = createChatLi("Por favor digite um número válido!", "incoming");
                        }

                    } else {

                        if (userMessage == 1) {
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Verifique se seu email e senha estão corretos\n3. Feche o site e tente novamente\n4. Caso os erros persistam mande mensagem no nosso suporte", "incoming");
                        } else if (userMessage == 2) {
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Verifique se já está logado no site\n3. Tente cadastrar por meio de outro email\n4. Caso os erros persistam mande mensagem no nosso suporte");
                        } else if (userMessage == 3) {
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Tente com outro computador\n3. Tente abrir uma nova guia e acessar o site\n4. Caso os erros persistam mande mensagem no nosso suporte");
                        } else if (userMessage == 4) {
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Tente com outro computador\n3. Tente abrir uma nova guia e acessar o site\n4. Verifique se está conectado no site\n 5. Caso os erros persistam mande mensagem no nosso suporte");
                            
                        } else if (userMessage == 5) {
                            var incomingChatLi = createChatLi("Certo, siga os seguintes passos:\n1. Verifique se seu computador está com internet\n2. Tente cadastrar um novo Totem\n3. Tente abrir uma nova guia e acessar o site\n4. Caso os erros persistam mande mensagem no nosso suporte");
                            
                        } else if (userMessage == 6) {
                            var incomingChatLi = createChatLi("Puxa vida, que pena que não consegui resolver seu problema :(\n Entre em contato com nossa equipe de suporte relatando-o para podermos ajudar.", "incoming");
                        } else {
                            etapa = 3;
                            var incomingChatLi = createChatLi("Por favor digite um número válido!", "incoming");
                        }

                    }
                } else {
                    if (userMessage == 1) {
                        var incomingChatLi = createChatLi("SIM! Desde que o senhor(a) tenha acesso a um computador com internet, você podera acessar o nosso sistema mesmo se estive do outro lado do mundo ;)", "incoming");
                    } else if (userMessage == 2) {
                        var incomingChatLi = createChatLi("SIM! Nossa equipe de suporte estará disponivel 24hrs para tirar qualquer dúvida em relação ao sistema, ou resolver possíveis incidentes.", "incoming");
                    } else if (userMessage == 3) {
                        var incomingChatLi = createChatLi("Puxa vida, que pena que não consegui resolver sua dúvida :(\n Entre em contato com nossa equipe de suporte relatando sua dúvida para podermos ajudar.", "incoming");
                    } else {
                        etapa = 3;
                        var incomingChatLi = createChatLi("Por favor digite um número válido!", "incoming");
                    }
                }

            }
        }
        // alert(userMessage)
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);

}

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));