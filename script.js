// Declaração das strings e arrays
var string = "( Olhar todo esse maravilhoso portifólio te enche de determinação. )";
var stringTwo = "( HP recuperado completamente. )";
var arrayTwo = stringTwo.split(""); // Array da segunda string
var array = string.split(""); // Array da primeira string

// Variáveis de controle
var timer;
var soundPlayed = false;

// Função para animar a primeira caixa de diálogo
function frameLooper() {
  if (array.length > 0) {
    var currentText = document.getElementById("text").innerHTML;
    var newText = currentText + array.shift();
    document.getElementById("text").innerHTML = newText;
    playKeySound(); // Reproduz o som das teclas

    // Adiciona evento para passar para a segunda caixa de diálogo
    if (newText.length === string.length) {
      document.querySelector('.ctn').addEventListener('click', function () {
        document.querySelector('.ctn').classList.add('hidden');
        document.querySelector('.ctntwo').classList.remove('hiddentwo');
        frameLooperTwo(); // Chama função para exibir a segunda caixa de diálogo
      });
    }
  } else {
    clearTimeout(timer);
  }
  loopTimer = setTimeout(frameLooper, 60); // Altere 60 para velocidade
}

// Função para animar a segunda caixa de diálogo
function frameLooperTwo() {
  if (arrayTwo.length > 0) {
    var currentTextTwo = document.getElementById("texttwo").innerHTML;
    var newTextTwo = currentTextTwo + arrayTwo.shift();
    document.getElementById("texttwo").innerHTML = newTextTwo;
    playKeySound(); // Reproduz o som das teclas

    // Adiciona evento para fechar a segunda caixa de diálogo e salvar o jogo
    if (newTextTwo.length === stringTwo.length) {
      document.querySelector('.ctntwo').addEventListener('click', function () {
        document.querySelector('.ctntwo').classList.add('hiddentwo');
        openSave(); // Chama função para abrir a janela de salvamento
      });
    }
  } else {
    clearTimeout(timer);
  }
  loopTimer = setTimeout(frameLooperTwo, 60); // Altere 60 para velocidade
}

// Função para reproduzir o som das teclas
function playKeySound() {
  var keySound = document.getElementById("keySound");
  keySound.currentTime = 0; // Reinicia o áudio para reprodução
  keySound.play();
}

// Função para sair do modo de tela cheia
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

// Função para abrir o modo de tela cheia
function openFullscreen(iframeId) {
  var elem = document.getElementById(iframeId);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
    elem.setAttribute("scrolling", "yes");
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
    elem.setAttribute("scrolling", "yes");
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
    elem.setAttribute("scrolling", "yes");
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
    elem.setAttribute("scrolling", "yes");
  }
}

// Função para lidar com o clique no botão de salvar
function saveBtnClickHandler() {
  // Remover o ouvinte de eventos após a primeira execução
  document.querySelector('.savebtn').removeEventListener('click', saveBtnClickHandler);

  // Verificar se o som já foi tocado
  if (!soundPlayed) {
    // Reproduzir o som apenas se ainda não foi tocado
    var startSave = document.getElementById("StartSave");
    startSave.play();
    // Atualizar a variável para indicar que o som foi tocado
    soundPlayed = true;
  }
  // Remover a classe "hidden" para exibir o elemento .ctn
  document.querySelector('.ctn').classList.remove('hidden');
}

// Adicionar ouvinte de eventos ao .savebtn para exibir a primeira caixa de diálogo
document.querySelector('.savebtn').addEventListener('click', saveBtnClickHandler);

// Função para lidar com o clique no botão de salvar na segunda caixa de diálogo
function openSave() {
  var saveSound = document.getElementById("SaveSound");
  var popup = document.getElementById("popup");
  let soulImg = document.getElementById('soul');
  let saveReturn = document.getElementById('SaveReturn');
  let saveBtn = document.getElementById('Save');
  let player = document.getElementById('player');
  let lvl = document.getElementById('lvl');
  let time = document.getElementById('time');
  popup.style.display = "block";

  // Adicionar evento para salvar o jogo ao clicar no botão de salvar
  document.getElementById("Save").addEventListener("click", function () {
    saveBtn.innerHTML = "<h1 id='SaveGame'>Jogo Salvo</h1>";
    time.innerHTML = "25:18";
    lvl.innerHTML = "LV 1";
    saveBtn.style.color = "yellow";
    saveReturn.style.display = "none";
    soulImg.style.display = 'none';
    saveSound.play();
    player.style.color = "yellow";
    lvl.style.color = "yellow";
    time.style.color = "yellow";
    yellow4.style.color = "yellow";
  });
}

// Função para fechar a janela de salvamento ao clicar fora dela
function closePopup() {
  let popup = document.getElementById('popup');
  let window = document.getElementById('Iframe0');
  window.addEventListener('click', (e) => {
    if (e.target.id == 'Iframe0' || e.target.id == 'SaveReturn') {
      popup.style.display = "none";
      location.reload();
      exitFullscreen();
    }
  });
}
closePopup(); // Chamada da função para fechar a janela de salvamento