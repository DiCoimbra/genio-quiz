const h2 = document.getElementById("num-questao");
const h4 = document.getElementById("enun-questao");

const opcao1 = document.getElementById("opcao1");
const opcao2 = document.getElementById("opcao2");
const opcao3 = document.getElementById("opcao3");
const opcao4 = document.getElementById("opcao4");

const questoes = [
    "Qual das alternativas abaixo apresenta uma equação do segundo grau com apenas uma raiz real?", //ÍNDICE ZERO
    "Qual dos pokemons nas alternativas abaixo tem como cor primária o amarelo?",
    "Qual vantagem de 3D&T abaixo custa dois pontos de personagem para ser obtida?"
];

const opcoes = [
    ["x<sup>2</sup> &minus; 5x &plus; 6 &equals; 0",
    "x<sup>2</sup> &minus; 6x &plus; 9 &equals; 0",
    "x<sup>2</sup> &minus; 9 &equals; 0",
    "x<sup>2</sup> &plus; x &plus; 1 &equals; 0"],
    ["Quilladin", "Shiftry", "Zeraora", "Palafin"],
    ["Genialidade", "Ataque Múltiplo", "Tiro Múltiplo", "Arena"]
];

const correta = [1, 2, 2];

let fase = 0;

document.addEventListener("DOMContentLoaded", function() {
    carregarConteudo();
});

function carregarConteudo() {
    h2.innerHTML = "Questão " + (fase + 1);
    h4.innerHTML = questoes[fase];

    opcao1.innerHTML = opcoes[fase][0];
    opcao2.innerHTML = opcoes[fase][1];
    opcao3.innerHTML = opcoes[fase][2];
    opcao4.innerHTML = opcoes[fase][3];
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
        if (fase !== 2) {
            fase = fase + 1;
            carregarConteudo();
        }
    } else {
        alert("Errou");
            fase = 0;
            carregarConteudo();
        }
    }
