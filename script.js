const h2 = document.getElementById("num-questao");
const h4 = document.getElementById("enun-questao");

const opcao1 = document.getElementById("opcao1");
const opcao2 = document.getElementById("opcao2");
const opcao3 = document.getElementById("opcao3");
const opcao4 = document.getElementById("opcao4");

const questoes = [
    "Qual é o maior país do mundo em tamanho?", //ÍNDICE ZERO
    "Qual destes países não se trata de um arquipélago?",
    "País que sediou as olimpíadas de 2012?",
    "Qual o nome da capital do Paraguai?"
];

const opcoes = [
    ["Brasil", "Rússia", "Estados Unidos", "China"],
    ["Micronésia", "Nova Zelândia", "Nepal", "Cabo Verde"],
    ["França", "Espanha", "Reino Unido", "Suíça"],
    ["Libertad", "Olimpia", "Ciudad Del Este", "Assunção"]
];

const correta = [1, 2, 2, 3];

let fase = 0;

document.addEventListener("DOMContentLoaded", function() {
    carregarConteudo();
});

function carregarConteudo() {
    if (fase != 4) {
        h2.innerHTML = "Questão " + (fase + 1);
        h4.innerHTML = questoes[fase];

        opcao1.innerHTML = opcoes[fase][0];
        opcao2.innerHTML = opcoes[fase][1];
        opcao3.innerHTML = opcoes[fase][2];
        opcao4.innerHTML = opcoes[fase][3];
    }else if (fase = 4) {
            opcao1.setAttribute("hidden", true);
            opcao2.setAttribute("hidden", true);
            opcao3.setAttribute("hidden", true);
            opcao4.setAttribute("hidden", true);
            const recomeco = document.getElementById("botaodefalha");
            botaodefalha.removeAttribute("hidden");
        }    
    }

function clicou1() {
    verificarCorreta(0);
}

function clicou2() {
    verificarCorreta(1);
}

function clicou3() {
    verificarCorreta(2);
}

function clicou4() {
    verificarCorreta(3);
}

function verificarCorreta(escolha) {
    if (escolha === correta[fase]) {
        alert("Acertou");
        if (fase !== 3) {
            fase = fase + 1;
            carregarConteudo();
        }
    }else{
        fase = 4;
        carregarConteudo();
    }
}
function recomecar() {
    fase = 0;
    opcao1.removeAttribute("hidden");
    opcao2.removeAttribute("hidden");
    opcao3.removeAttribute("hidden");
    opcao4.removeAttribute("hidden");
    botaodefalha.setAttribute("hidden", true)
    carregarConteudo();
}    
