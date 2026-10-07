const h2 = document.getElementById("num-questao");
const h4 = document.getElementById("enun-questao");

const opcao1 = document.getElementById("opcao1");
const opcao2 = document.getElementById("opcao2");
const opcao3 = document.getElementById("opcao3");
const opcao4 = document.getElementById("opcao4");

const botaorecomecar = document.getElementById("recomecar");

let fase = 0;

document.addEventListener("DOMContentLoaded", function() {
    carregarConteudo();
});

function obterDados() {
    return fetch("questoes.json")
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Sem resposta");
            }

            if (resposta.status == 404) {
                throw new Error("404");
            }

            return resposta.json();
        })
        .then(dados => {
            return dados;
        })
        .catch(erro => {
            console.error("Erro: ", erro)
        })
}

function carregarConteudo() {
    obterDados().then(dados => {
        const enunciados = dados["enunciados"];
        const alternativas = dados["alternativas"];

        h2.innerHTML = "Questão " + (fase + 1);
        h4.innerHTML = enunciados[fase];

        opcao1.innerHTML = alternativas[fase][0];
        opcao2.innerHTML = alternativas[fase][1];
        opcao3.innerHTML = alternativas[fase][2];
        opcao4.innerHTML = alternativas[fase][3];
    })
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

function recomecar() {
    opcao1.removeAttribute("hidden");
    opcao2.removeAttribute("hidden");
    opcao3.removeAttribute("hidden");
    opcao4.removeAttribute("hidden");

    botaorecomecar.setAttribute("hidden", true);
    
    fase = 0;
    carregarConteudo();
}

function verificarCorreta(escolha) {
    obterDados().then(dados => {
        const corretas = dados["corretas"];
        const qtd_de_fases = dados["qtd_de_fases"];

        if (escolha === corretas[fase]) {
            alert("Acertou");
            if (fase !== (qtd_de_fases - 1)) {
                fase = fase + 1;
                carregarConteudo();
            }
        } else {
            alert("Errou");
            telaDeRecomeco();
        }
    })
}

function telaDeRecomeco() {
    opcao1.setAttribute("hidden", true);
    opcao2.setAttribute("hidden", true);
    opcao3.setAttribute("hidden", true);
    opcao4.setAttribute("hidden", true);

    botaorecomecar.removeAttribute("hidden");
}
