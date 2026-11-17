/* =====================================================
   SCRIPT DA BARBEARIA
   Só mexa aqui: coloque o número do WhatsApp da barbearia
   (com 55 + DDD + número, sem espaços, sem traços)
   Exemplo: 5511999999999
===================================================== */

// CRIAÇÃO DA VARIÁVEL DO NÚMERO DA BARBEARIA
var numeroWhatsapp = "55119960810254";


/* ---------- 1) MENU DO CELULAR ---------- */
var botaoMenu = document.getElementById("botaoMenu");
var menu = document.getElementById("menu");

// Abre e fecha o menu ao clicar no botão ☰
botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("aberto");
});

// Fecha o menu quando clicar em qualquer link
var linksMenu = document.querySelectorAll(".menu a");
for (var i = 0; i < linksMenu.length; i++) {
  linksMenu[i].addEventListener("click", function () {
    menu.classList.remove("aberto");
  });
}


/* ---------- 2) MENU MUDA DE COR AO ROLAR A PÁGINA ---------- */
var topo = document.getElementById("topo");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    topo.classList.add("rolou");
  } else {
    topo.classList.remove("rolou");
  }

  mostrarElementos();
});


/* ---------- 3) ANIMAÇÃO: ELEMENTOS APARECEM AO ROLAR ---------- */
function mostrarElementos() {
  var elementos = document.querySelectorAll(".reveal");

  for (var i = 0; i < elementos.length; i++) {
    var posicao = elementos[i].getBoundingClientRect().top;

    // Se o elemento já entrou na tela, ele aparece
    if (posicao < window.innerHeight - 80) {
      elementos[i].classList.add("aparecer");
    }
  }
}

mostrarElementos(); // roda uma vez quando abre o site


/* ---------- 4) BOTÕES "AGENDAR" DOS SERVIÇOS ---------- */
// Ao clicar, já escolhe o serviço no formulário e desce até ele
var botoesServico = document.querySelectorAll(".btn-servico");

for (var j = 0; j < botoesServico.length; j++) {
  botoesServico[j].addEventListener("click", function () {
    var servicoEscolhido = this.getAttribute("data-servico");
    document.getElementById("servico").value = servicoEscolhido;
    document.getElementById("agendar").scrollIntoView();
  });
}


/* ---------- 5) DATA: NÃO DEIXA ESCOLHER DIAS PASSADOS ---------- */
var campoData = document.getElementById("data");
var hoje = new Date();
var ano = hoje.getFullYear();
var mes = String(hoje.getMonth() + 1).padStart(2, "0");
var dia = String(hoje.getDate()).padStart(2, "0");

campoData.min = ano + "-" + mes + "-" + dia;


/* ---------- 6) FORMULÁRIO: ENVIA PARA O WHATSAPP ---------- */
var formulario = document.getElementById("formulario");
var erro = document.getElementById("erro");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar

  // Pega o que a pessoa preencheu
  var nome = document.getElementById("nome").value.trim();
  var servico = document.getElementById("servico").value;
  var barbeiro = document.getElementById("barbeiro").value;
  var data = document.getElementById("data").value;
  var hora = document.getElementById("hora").value;

  // Confere se tudo foi preenchido
  if (nome === "" || servico === "" || data === "" || hora === "") {
    erro.textContent = "Preencha todos os campos para agendar.";
    return;
  }

  erro.textContent = "";

  // Troca a data de 2026-11-25 para 25/11/2026
  var partes = data.split("-");
  var dataBonita = partes[2] + "/" + partes[1] + "/" + partes[0];

  // Monta a mensagem que vai aparecer no WhatsApp
  var mensagem =
    "Olá! Quero agendar um horário.\n\n" +
    "Nome: " + nome + "\n" +
    "Serviço: " + servico + "\n" +
    "Barbeiro: " + barbeiro + "\n" +
    "Data: " + dataBonita + "\n" +
    "Horário: " + hora;

  // Cria o link e abre o WhatsApp
  var link = "https://wa.me/" + numeroWhatsapp + "?text=" + encodeURIComponent(mensagem);
  window.open(link, "_blank");
});


/* ---------- 7) BOTÃO FLUTUANTE DO WHATSAPP ---------- */
var whatsFlutuante = document.getElementById("whatsFlutuante");

whatsFlutuante.href =
  "https://wa.me/" + numeroWhatsapp + "?text=" + encodeURIComponent("Olá! Vim pelo site da barbearia.");
whatsFlutuante.target = "_blank";


/* ---------- 8) ANO AUTOMÁTICO NO RODAPÉ ---------- */
document.getElementById("ano").textContent = new Date().getFullYear();
