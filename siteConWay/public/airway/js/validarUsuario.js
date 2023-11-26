function validarGerenteAnalista() {
    let menu = document.getElementById("accordionSidebar");
    if (sessionStorage.GERENTE_FUNCIONARIO == "null") {
        inserirSlideEmpresa(menu);
        inserirEmpresaFuncionarios(menu);
        inserirContaMetricas(menu);
        inserirSlideConta(menu);
        inserirContaPerfil(menu);
        inserirContaSair(menu);
        inserirSlideFinal(menu);
        // eliminarOption("Analista")
    } else if (sessionStorage.GERENTE_FUNCIONARIO == 1) {
        inserirGerenteOcorrencias(menu);
        inserirGerenteAna2(menu) 
        inserirGerenteDashBia(menu);
        inserirSlideEmpresa(menu);
        inserirEmpresaFuncionarios(menu);
        inserirContaMetricas(menu);
        inserirEmpresaTotem(menu);
        inserirSlideConta(menu);
        inserirContaPerfil(menu);
        inserirContaSair(menu);
        inserirSlideFinal(menu);
        
        // eliminarOption("Gerente")
    } else {
        inserirAnalistaJoao(menu);
        inserirAnalistaKauan(menu);
        inserirAnalistaAna(menu);
        inserirAnalistaAna2(menu)
        inserirSlideConta(menu);
        inserirContaPerfil(menu);
        inserirContaSair(menu);
        inserirSlideFinal(menu);
    }    
}

function inserirGerenteOcorrencias(menu) {
    let liGerenteOcorrencias = document.createElement("li");
    liGerenteOcorrencias.setAttribute("class","nav-item");
    let aGerenteOcorrencias = document.createElement("a");
    aGerenteOcorrencias.setAttribute("class","nav-link")
    aGerenteOcorrencias.setAttribute("href","graficoBruno.html");
    let iGerenteOcorrencias = document.createElement("i");
    iGerenteOcorrencias.className = "fas fa-fw fa-tachometer-alt";
    let spanGerenteOcorrencias = document.createElement("span");
    spanGerenteOcorrencias.innerHTML = "Ocorrências";
    
    aGerenteOcorrencias.appendChild(iGerenteOcorrencias);
    aGerenteOcorrencias.appendChild(spanGerenteOcorrencias);
    liGerenteOcorrencias.appendChild(aGerenteOcorrencias);
    menu.appendChild(liGerenteOcorrencias);
}

function inserirGerenteDashBia(menu) {
    let liGerenteDashBia = document.createElement("li");
    liGerenteDashBia.setAttribute("class","nav-item");
    let aGerenteDashBia = document.createElement("a");
    aGerenteDashBia.setAttribute("class","nav-link")
    aGerenteDashBia.setAttribute("href","graficoBia.html");
    let iGerenteDashBia = document.createElement("i");
    iGerenteDashBia.className = "fas fa-fw fa-tachometer-alt";
    let spanGerenteDashBia = document.createElement("span");
    spanGerenteDashBia.innerHTML = "Temperatura";
    aGerenteDashBia.appendChild(iGerenteDashBia);
    aGerenteDashBia.appendChild(spanGerenteDashBia);
    liGerenteDashBia.appendChild(aGerenteDashBia);
    menu.appendChild(liGerenteDashBia);
}

function inserirAnalistaKauan(menu) {
    let liAnalistaKauan = document.createElement("li");
    liAnalistaKauan.setAttribute("class","nav-item");
    let aAnalistaKauan = document.createElement("a");
    aAnalistaKauan.setAttribute("class","nav-link")
    aAnalistaKauan.setAttribute("href","graficoKauan.html");
    let iAnalistaKauan = document.createElement("i");
    iAnalistaKauan.className = "fas fa-fw fa-tachometer-alt";
    let spanAnalistaKauan = document.createElement("span");
    spanAnalistaKauan.innerHTML = "Totens";
    aAnalistaKauan.appendChild(iAnalistaKauan);
    aAnalistaKauan.appendChild(spanAnalistaKauan);
    liAnalistaKauan.appendChild(aAnalistaKauan);
    menu.appendChild(liAnalistaKauan);
}

function inserirAnalistaAna(menu) {
    let liAnalistaAna = document.createElement("li");
    liAnalistaAna.setAttribute("class","nav-item");
    let aAnalistaAna = document.createElement("a");
    aAnalistaAna.setAttribute("class","nav-link")
    aAnalistaAna.setAttribute("href","graficoAna.html");
    let iAnalistaAna = document.createElement("i");
    iAnalistaAna.className = "fas fa-fw fa-tachometer-alt";
    let spanAnalistaAna = document.createElement("span");
    spanAnalistaAna.innerHTML = "Manutenção dos totens";
    aAnalistaAna.appendChild(iAnalistaAna);
    aAnalistaAna.appendChild(spanAnalistaAna);
    liAnalistaAna.appendChild(aAnalistaAna);
    menu.appendChild(liAnalistaAna);
}

function inserirAnalistaAna2(menu) {
    let liAnalistaAna2 = document.createElement("li");
    liAnalistaAna2.setAttribute("class","nav-item");
    let aAnalistaAna2 = document.createElement("a");
    aAnalistaAna2.setAttribute("class","nav-link")
    aAnalistaAna2.setAttribute("href","graficoAnaLista.html");
    let iAnalistaAna2 = document.createElement("i");
    iAnalistaAna2.className = "fas fa-fw fa-tachometer-alt";
    let spanAnalistaAna2 = document.createElement("span");
    spanAnalistaAna2.innerHTML = "Aprovação e reprovação das manutenções";
    aAnalistaAna2.appendChild(iAnalistaAna2);
    aAnalistaAna2.appendChild(spanAnalistaAna2);
    liAnalistaAna2.appendChild(aAnalistaAna2);
    menu.appendChild(liAnalistaAna2);
}

function inserirGerenteAna2(menu) {
    let liGerenteAna = document.createElement("li");
    liGerenteAna.setAttribute("class","nav-item");
    let aGerenteAna = document.createElement("a");
    aGerenteAna.setAttribute("class","nav-link")
    aGerenteAna.setAttribute("href","graficoAna3.html");
    let iGerenteAna = document.createElement("i");
    iGerenteAna.className = "fas fa-fw fa-tachometer-alt";
    let spanGerenteAna = document.createElement("span");
    spanGerenteAna.innerHTML = "Aprovação das manutenções";
    aGerenteAna.appendChild(iGerenteAna);
    aGerenteAna.appendChild(spanGerenteAna);
    liGerenteAna.appendChild(aGerenteAna);
    menu.appendChild(liGerenteAna);
}


function inserirAnalistaJoao(menu) {
    let liAnalistaJoao = document.createElement("li");
    liAnalistaJoao.setAttribute("class","nav-item");
    let aAnalistaJoao = document.createElement("a");
    aAnalistaJoao.setAttribute("class","nav-link")
    aAnalistaJoao.setAttribute("href","graficoJoao.html");
    let iAnalistaJoao = document.createElement("i");
    iAnalistaJoao.className = "fas fa-fw fa-tachometer-alt";
    let spanAnalistaJoao = document.createElement("span");
    spanAnalistaJoao.innerHTML = "Dashboard Geral";
    
    aAnalistaJoao.appendChild(iAnalistaJoao);
    aAnalistaJoao.appendChild(spanAnalistaJoao);
    liAnalistaJoao.appendChild(aAnalistaJoao);
    menu.appendChild(liAnalistaJoao);
}

function inserirSlideEmpresa(menu) {
    let hrSlideEmpresa = document.createElement("hr");
    hrSlideEmpresa.className = "sidebar-divider";
    let divSlideEmpresa = document.createElement("div");
    divSlideEmpresa.className = "sidebar-heading";
    divSlideEmpresa.innerHTML = "EMPRESA"
    
    menu.appendChild(hrSlideEmpresa);
    menu.appendChild(divSlideEmpresa);
}        

function inserirEmpresaFuncionarios(menu) {
    let liEmpresaFuncionarios = document.createElement("li");
    liEmpresaFuncionarios.setAttribute("class","nav-item");
    let aEmpresaFuncionarios = document.createElement("a");
    aEmpresaFuncionarios.setAttribute("class","nav-link")
    aEmpresaFuncionarios.setAttribute("href","empresa-funcionario.html");
    let iEmpresaFuncionarios = document.createElement("i");
    iEmpresaFuncionarios.className = "fas fa-fw fa-user";
    let spanEmpresaFuncionarios = document.createElement("span");
    spanEmpresaFuncionarios.innerHTML = "Funcionário";
    
    aEmpresaFuncionarios.appendChild(iEmpresaFuncionarios);
    aEmpresaFuncionarios.appendChild(spanEmpresaFuncionarios);
    liEmpresaFuncionarios.appendChild(aEmpresaFuncionarios);
    menu.appendChild(liEmpresaFuncionarios);
}

function inserirEmpresaTotem(menu) {
    let liEmpresaTotem = document.createElement("li");
    liEmpresaTotem.setAttribute("class","nav-item");
    let aEmpresaTotem = document.createElement("a");
    aEmpresaTotem.setAttribute("class","nav-link")
    aEmpresaTotem.setAttribute("href","empresa-totem.html");
    let iEmpresaTotem = document.createElement("i");
    iEmpresaTotem.className = "fas fa-fw fa-user";
    let spanEmpresaTotem = document.createElement("span");
    spanEmpresaTotem.innerHTML = "Totem";
    
    aEmpresaTotem.appendChild(iEmpresaTotem);
    aEmpresaTotem.appendChild(spanEmpresaTotem);
    liEmpresaTotem.appendChild(aEmpresaTotem);
    menu.appendChild(liEmpresaTotem);
}

function inserirSlideConta(menu) {
    let hrSlideConta = document.createElement("hr");
    hrSlideConta.className = "sidebar-divider";
    let divSlideConta = document.createElement("div");
    divSlideConta.className = "sidebar-heading";
    divSlideConta.innerHTML = "CONTA"
    
    menu.appendChild(hrSlideConta);
    menu.appendChild(divSlideConta);
}  

function inserirContaPerfil(menu) {
    let liContaPerfil = document.createElement("li");
    liContaPerfil.setAttribute("class","nav-item");
    let aContaPerfil = document.createElement("a");
    aContaPerfil.setAttribute("class","nav-link")
    aContaPerfil.setAttribute("href","perfil.html");
    let iContaPerfil = document.createElement("i");
    iContaPerfil.className = "fas fa-fw fa-user";
    let spanContaPerfil = document.createElement("span");
    spanContaPerfil.innerHTML = "Perfil";
    
    aContaPerfil.appendChild(iContaPerfil);
    aContaPerfil.appendChild(spanContaPerfil);
    liContaPerfil.appendChild(aContaPerfil);
    menu.appendChild(liContaPerfil);
}

function inserirContaMetricas(menu) {
    let liContaMetricas = document.createElement("li");
    liContaMetricas.setAttribute("class","nav-item");
    let aContaMetricas = document.createElement("a");
    aContaMetricas.setAttribute("class","nav-link")
    aContaMetricas.setAttribute("href","empresa-metricas.html");
    let iContaMetricas = document.createElement("i");
    iContaMetricas.className = "fas fa-fw fa-user";
    let spanContaMetricas = document.createElement("span");
    spanContaMetricas.innerHTML = "Métricas";
    
    aContaMetricas.appendChild(iContaMetricas);
    aContaMetricas.appendChild(spanContaMetricas);
    liContaMetricas.appendChild(aContaMetricas);
    menu.appendChild(liContaMetricas);
}

function inserirContaSair(menu) {
    let liContaSair = document.createElement("li");
    liContaSair.setAttribute("class","nav-item");
    let aContaSair = document.createElement("a");
    aContaSair.setAttribute("class","nav-link")
    aContaSair.setAttribute("data-toggle","modal");
    aContaSair.setAttribute("data-target","#logoutModal");
    aContaSair.style.cursor = "pointer"
    let iContaSair = document.createElement("i");
    iContaSair.className = "fas fa-fw fa-table";
    let spanContaSair = document.createElement("span");
    spanContaSair.innerHTML = "Sair";
    
    aContaSair.appendChild(iContaSair);
    aContaSair.appendChild(spanContaSair);
    liContaSair.appendChild(aContaSair);
    menu.appendChild(liContaSair);
}

function inserirSlideFinal(menu) {
    menu.innerHTML += '<div class="text-center d-none d-md-inline"><button class="rounded-circle border-0" id="sidebarToggle"></button></div>';
    // let hrSlideConta = document.createElement("hr");
    // hrSlideConta.className = "sidebar-divider d-none d-md-block";
    // let divSlideConta = document.createElement("div");
    // divSlideConta.className = "text-center d-none d-md-inline";
    // let botaoSlideConta = document.createElement("div");
    // botaoSlideConta.className = "rounded-circle border-0";
    // botaoSlideConta.id ="sidebarToggle";
    
    
    // divSlideConta.appendChild(botaoSlideConta);
    // menu.appendChild(hrSlideConta);
    // menu.appendChild(divSlideConta);
} 
