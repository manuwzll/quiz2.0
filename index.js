
const perguntas = {
  facil: [
    {
      pergunta: "Qual é o maior animal do fundo do mar?",
      opcoes: ["Tubarão-branco", "Baleia-azul", "Lula-gigante", "Orca"],
      resposta: "Baleia-azul"
    },
    {
      pergunta: "O que é um recife de coral?",
      opcoes: ["Uma rocha", "Uma planta", "Um animal", "Uma areia"],
      resposta: "Um animal"
    },
    {
      pergunta: "Qual desses animais é venenoso?",
      opcoes: ["Estrela-do-mar", "Água-viva", "Baleia", "Cavalo-marinho"],
      resposta: "Água-viva"
    },
    {
      pergunta: "Quantos oceanos existem na Terra?",
      opcoes: ["3", "4", "5", "6"],
      resposta: "5"
    },
    {
      pergunta: "Qual animal é conhecido por mudar de cor?",
      opcoes: ["Tubarão", "Polvo", "Peixe-palhaço", "Golfinho"],
      resposta: "Polvo"
    },
    {
      pergunta: "Qual destes não vive no mar?",
      opcoes: ["Cavalo-marinho", "Lobo-marinho", "Tubarão", "Águia"],
      resposta: "Águia"
    },
    {
      pergunta: "Qual peixe ficou famoso no filme 'Procurando Nemo'?",
      opcoes: ["Peixe-palhaço", "Peixe-espada", "Baiacu", "Tubarão"],
      resposta: "Peixe-palhaço"
    },
    {
      pergunta: "Qual é o habitat natural dos pinguins?",
      opcoes: ["Ártico", "Antártida", "Brasil", "África"],
      resposta: "Antártida"
    },
    {
      pergunta: "O que é o plâncton?",
      opcoes: ["Peixe", "Planta", "Organismos microscópicos", "Coral"],
      resposta: "Organismos microscópicos"
    },
    {
      pergunta: "Qual desses animais possui uma concha?",
      opcoes: ["Polvo", "Caramujo-marinho", "Tubarão", "Baleia"],
      resposta: "Caramujo-marinho"
    }
  ],
  dificil: [
    {
      pergunta: "Qual animal possui o veneno mais letal dos oceanos?",
      opcoes: ["Tubarão", "Água-viva-caixa", "Polvo-de-anéis-azuis", "Moreia"],
      resposta: "Polvo-de-anéis-azuis"
    },
    {
      pergunta: "A lula-colossal pode atingir quantos metros?",
      opcoes: ["3 metros", "6 metros", "10 metros", "14 metros"],
      resposta: "14 metros"
    },
    {
      pergunta: "Qual peixe é capaz de gerar eletricidade?",
      opcoes: ["Enguia-elétrica", "Cavalo-marinho", "Peixe-palhaço", "Estrela-do-mar"],
      resposta: "Enguia-elétrica"
    },
    {
      pergunta: "Qual a profundidade média da Fossa das Marianas?",
      opcoes: ["5.000m", "7.000m", "10.000m", "11.000m"],
      resposta: "11.000m"
    },
    {
      pergunta: "O que são bioluminescentes?",
      opcoes: ["Animais que brilham", "Animais cegos", "Animais venenosos", "Animais gigantes"],
      resposta: "Animais que brilham"
    },
    {
      pergunta: "O peixe-pedra se camufla em que tipo de ambiente?",
      opcoes: ["Corais", "Areia", "Pedras", "Lama"],
      resposta: "Pedras"
    },
    {
      pergunta: "Qual é o animal mais rápido dos oceanos?",
      opcoes: ["Orca", "Peixe-vela", "Tubarão-mako", "Atum"],
      resposta: "Peixe-vela"
    },
    {
      pergunta: "O que é um narval?",
      opcoes: ["Peixe", "Baleia com presas longas", "Tubarão raro", "Molusco gigante"],
      resposta: "Baleia com presas longas"
    },
    {
      pergunta: "Quantos tentáculos possui um polvo?",
      opcoes: ["6", "8", "10", "12"],
      resposta: "8"
    },
    {
      pergunta: "Qual desses animais possui o maior cérebro proporcional ao corpo?",
      opcoes: ["Tubarão", "Golfinho", "Orca", "Polvo"],
      resposta: "Polvo"
    }
  ]
};


const frasesResultado = [
  "🏆 Você arrasou! Maravilhoso(a) como um coral brilhante.",
  "🦈 Quase virou isca, mas nadou bem.",
  "Devagar, quase parando... mas foi!",
  "Parece que você se perdeu nas profundezas.",
  " Um tsunami de sabedoria... ou quase isso.",
  " Você tentou, é o que importa (ou não).",
  " Nem todo peixe sabe tudo sobre o mar, né?",
  "Pior que isso, só se fosse afundar... ops!"
];


let dificuldade = "";
let indicePergunta = 0;
let pontuacao = 0;
let perguntasAtuais = [];


function iniciarQuiz(nivel) {
  dificuldade = nivel;
  sessionStorage.setItem("dificuldade", nivel);
  sessionStorage.setItem("pontuacao", 0);
  sessionStorage.setItem("indicePergunta", 0);
  window.location.href = "perguntas.html";
}

function voltarHome() {
  window.location.href = "index.html";
}

// Carregar perguts
window.onload = function() {
  const pagina = window.location.pathname.split("/").pop();

  if (pagina === "perguntas.html") {
    dificuldade = sessionStorage.getItem("dificuldade");
    pontuacao = parseInt(sessionStorage.getItem("pontuacao"));
    indicePergunta = parseInt(sessionStorage.getItem("indicePergunta"));

    perguntasAtuais = perguntas[dificuldade];

    carregarPergunta();

    document.getElementById("quizForm").addEventListener("submit", function(e) {
      e.preventDefault();
      verificarResposta();
    });
  }

  if (pagina === "resultado.html") {
    const pontos = sessionStorage.getItem("pontuacao");
    document.getElementById("pontuacao").innerText = `Você fez ${pontos} ponto(s)!`;
    const frase = frasesResultado[Math.floor(Math.random() * frasesResultado.length)];
    document.getElementById("mensagem").innerText = frase;
  }
};

// Exibir pergta
function carregarPergunta() {
  const perguntaObj = perguntasAtuais[indicePergunta];

  document.getElementById("titulo").innerText = `Pergunta ${indicePergunta + 1}`;

  let html = `<div class="pergunta"><p>${perguntaObj.pergunta}</p>`;

  perguntaObj.opcoes.forEach(opcao => {
    html += `
      <label>
        <input type="radio" name="resposta" value="${opcao}" required>
        ${opcao}
      </label>`;
  });

  html += `</div>`;
  document.getElementById("perguntaContainer").innerHTML = html;
}

// Verificar respo
function verificarResposta() {
  const selecionado = document.querySelector('input[name="resposta"]:checked');
  if (!selecionado) return;

  const resposta = selecionado.value;
  const correta = perguntasAtuais[indicePergunta].resposta;

  const labels = document.querySelectorAll('label');

  labels.forEach(label => {
    const input = label.querySelector('input');
    if (input.value === correta) {
      label.classList.add('correta');
    } else if (input.checked && input.value !== correta) {
      label.classList.add('errada');
    }
  });

  if (resposta === correta) {
    pontuacao++;
  }

  setTimeout(() => {
    indicePergunta++;

    if (indicePergunta >= perguntasAtuais.length) {
      sessionStorage.setItem("pontuacao", pontuacao);
      window.location.href = "resultado.html";
    } else {
      sessionStorage.setItem("pontuacao", pontuacao);
      sessionStorage.setItem("indicePergunta", indicePergunta);
      carregarPergunta();
    }
  }, 1000);
}

// Destacar 
document.addEventListener('click', function(e) {
  if (e.target && e.target.name === 'resposta') {
    const labels = document.querySelectorAll('label');
    labels.forEach(label => label.classList.remove('selecionado'));
    e.target.parentNode.classList.add('selecionado');
  }
});