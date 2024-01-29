

// Adiciona um ouvinte de eventos ao botão que chama a função iniciar quando clicado
document.getElementById('botaoIniciar').addEventListener('click', iniciar);

var perguntaAtual = 1;



// Obtém todos os botões de voltar pela classe
var botoesVoltar = document.getElementsByClassName('botao-voltar');



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

// Cria uma variável para armazenar o índice da pergunta atual
var currentQuestion = 0;

// Cria uma função para avançar para a próxima pergunta
function nextQuestion() {
  // Verifica se a pergunta atual é a última
  if (currentQuestion == 9) {
    // Chama a função para mostrar o resultado
    calcular();
  } else {
    // Incrementa o índice da pergunta atual
    currentQuestion++;
    // Seleciona o elemento do formulário HTML
    var form = document.getElementById("form");
    // Altera o atributo action do formulário para a próxima pergunta
    form.action = "pergunta" + (currentQuestion + 1) + ".html";
    // Submete o formulário
    form.submit();
  }
}

// Modifica a função para validar as respostas
function validate() {
  // Seleciona o elemento que contém as opções de resposta
  var options = document.getElementsByName("option");
  // Cria uma variável para armazenar a resposta correta
  var correctAnswer;
  // Cria uma variável para armazenar a resposta do usuário
  var userAnswer;
  // Cria uma variável para indicar se o usuário respondeu ou não
  var answered = false;
  // Percorre as opções de resposta
  for (var i = 0; i < options.length; i++) {
    // Verifica se a opção atual está marcada
    if (options[i].checked) {
      // Atribui o valor da opção à resposta do usuário
      userAnswer = options[i].value;
      // Define a variável answered como verdadeira
      answered = true;
    }
    // Verifica se a opção atual tem o atributo correto
    if (options[i].hasAttribute("correct")) {
      // Atribui o valor da opção à resposta correta
      correctAnswer = options[i].value;
    }
  }
  // Verifica se o usuário respondeu
  if (answered) {
    // Verifica se a resposta do usuário é igual à resposta correta
    if (userAnswer == correctAnswer) {
      // Incrementa a pontuação do usuário
      score++;
    }
    // Chama a função para avançar para a próxima pergunta
    nextQuestion();
  } else {
    // Mostra uma mensagem pedindo ao usuário para responder
    alert("Por favor, selecione uma resposta.");
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

