//SETOR DE VARIÁVEIS
//Se possível, declarem suas variáveis nesse primeiro setor do código pra deixar organizado
const h2 = document.getElementById("num-questao");
const h4 = document.getElementById("enun-questao");

const opcao1 = document.getElementById("opcao1");
const opcao2 = document.getElementById("opcao2");
const opcao3 = document.getElementById("opcao3");
const opcao4 = document.getElementById("opcao4");

const final = document.getElementById("mensagem-final");

const botoes_alternativas = document.querySelectorAll('.botoes-alternativas');

const botao_recomecar = document.getElementById("recomecar");
const botao_comecar = document.getElementById("botao-comecar");
const botao_instrucoes = document.getElementById("botao-instrucoes");

localStorage.getItem('erros') || localStorage.setItem('erros', +0);

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

function botaoDeComecar() {
    botao_comecar.setAttribute("hidden", true);
    botao_instrucoes.setAttribute("hidden", true);
    h2.removeAttribute("hidden");
    h4.removeAttribute("hidden");

    botoes_alternativas.forEach(function(button) {
        button.removeAttribute("hidden");
    })

    fase = 0;
    carregarConteudo();
}

function botaoDeInstrucoes() {
    obterDados().then(dados => {
        const mensagem = dados["instrucoes"];

        botao_instrucoes.setAttribute("hidden", true);
        botao_comecar.setAttribute("hidden", true);

        botao_recomecar.innerHTML = "Voltar";
        botao_recomecar.removeAttribute("hidden");
        
        h4.removeAttribute("hidden");
        h4.innerHTML = mensagem;
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
function verificarCorreta(escolha) {
    obterDados().then(dados => {
        const corretas = dados["corretas"];
        const qtd_de_fases = dados["qtd_de_fases"];

      if (escolha === corretas[fase]) {
            if (fase === qtd_de_fases - 1) {
                telaDeFinal();
            } else {
                fase++;
                carregarConteudo();
            }
        } else {
            const erros = +localStorage.getItem('erros');
            localStorage.setItem('erros', erros + 1);

            telaDeRecomeco();
        }
    })
}

function recomecar() {
    botao_recomecar.setAttribute("hidden", true);
    botao_comecar.removeAttribute("hidden");
    botao_instrucoes.removeAttribute("hidden");

    h4.setAttribute("hidden", true);
    h2.setAttribute("hidden", true);
    final.setAttribute("hidden", true);
    
    fase = 0;
    carregarConteudo();
}

function telaDeRecomeco() {
    opcao1.setAttribute("hidden", true);
    opcao2.setAttribute("hidden", true);
    opcao3.setAttribute("hidden", true);
    opcao4.setAttribute("hidden", true);
    h4.hidden = true;

    const erros = localStorage.getItem('erros');
    h2.innerHTML = "Erros: " + erros;

    botao_recomecar.innerHTML = "Recomeçar";
    botao_recomecar.removeAttribute("hidden");
}

function telaDeFinal() {
    botoes_alternativas.forEach(function(button) {button.setAttribute("hidden", true)})
    h4.setAttribute("hidden", true);

    final.removeAttribute("hidden");

    telaDeRecomeco()
}
