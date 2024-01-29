


// Adiciona um ouvinte de eventos ao botão que chama a função iniciar quando clicado
document.getElementById('botaoIniciar').addEventListener('click', iniciar);

var perguntaAtual = 1;

// Obtém todos os botões de avançar pela classe
var botoesAvancar = document.getElementsByClassName('botao-avancar');

// Obtém todos os botões de voltar pela classe
var botoesVoltar = document.getElementsByClassName('botao-voltar');

// Percorre todos os botões de avançar e adiciona um ouvinte de eventos a cada um
for (var i = 0; i < botoesAvancar.length; i++) {
  botoesAvancar[i].addEventListener('click', avancar);
}

// Percorre todos os botões de voltar e adiciona um ouvinte de eventos a cada um
for (var i = 0; i < botoesVoltar.length; i++) {
    botoesVoltar[i].addEventListener('click', voltar);
  }

// Função para iniciar o questionário e mostrar a primeira pergunta
function iniciar() {
    // Obter a caixa com as instruções
    var instrucoes = document.getElementsByClassName('caixa-instrucoes')[0];
    // Esconder as instruções
    instrucoes.hidden = true;
    // Obter a primeira pergunta
    var primeira = document.getElementById('q1');
    // Mostrar a primeira pergunta
    primeira.style.display = 'block';
}

// Função para avançar para a próxima pergunta ou mostrar o resultado
function avancar() {
    // Obter todas as opções da pergunta atual
    var opcoes = document.getElementsByName('q' + perguntaAtual);
    // Verificar se alguma opção foi selecionada
    var selecionado = Array.from(opcoes).some(radio => radio.checked);
    
    if (!selecionado) {
        alert('Por favor, selecione uma opção para avançar.');
        return; // Interrompe a função se nenhuma opção for selecionada
    }

    // Obter a pergunta atual
    var atual = document.getElementById("q" + perguntaAtual);
    // Esconder a pergunta atual
    atual.style.display = "none";
    // Incrementar o contador de pergunta atual
    perguntaAtual++;
    
    // Verificar se existe uma próxima pergunta
    if (perguntaAtual <= 15) {
        // Obter a próxima pergunta
        var proxima = document.getElementById("q" + perguntaAtual);
        // Mostrar a próxima pergunta
        proxima.style.display = "block";
    } else {
        // Se não existe uma próxima pergunta, mostrar o resultado
        var resultado = document.getElementsByClassName("caixa-resultado")[0];
        resultado.style.display = "block";
        calcular();
    }
}


// Código JavaScript para adicionar lógica e interatividade à página web
function calcular() {
    var total = 0;
    for (var i = 1; i <= 15; i++) {
        var checkbox = document.getElementById("q" + i + "a");
        if (checkbox.checked && checkbox.value == "sim") {
            total++;
        }
    }
    var resultado = document.getElementById("total");
    var chave = document.getElementById("chave");
    resultado.innerHTML = "Você assinalou " + total + " afirmações.";
    // Esconder os resultados que não correspondem ao total
    var linhas = chave.getElementsByTagName("tr");
    for (var j = 0; j < linhas.length; j++) {
        var linha = linhas[j];
        var valor = linha.getElementsByTagName("td")[0].innerHTML;
        var intervalo = valor.split(" — ");
        var minimo = parseInt(intervalo[0]);
        var maximo = parseInt(intervalo[1]);
        if (total < minimo || total > maximo) {
            linha.hidden = true;
        } else {
            linha.hidden = false;
        }
    }
}

// Função para voltar para a pergunta anterior
function voltar() {
    // Obter a pergunta atual
    var atual = document.getElementById("q" + perguntaAtual);
    // Esconder a pergunta atual
    atual.style.display = "none";
    // Decrementar o contador de pergunta atual
    perguntaAtual--;
    // Verificar se existe uma pergunta anterior
    if (perguntaAtual >= 1) {
        // Obter a pergunta anterior
        var anterior = document.getElementById("q" + perguntaAtual);
        // Mostrar a pergunta anterior
        anterior.style.display = "block";
    }
}

