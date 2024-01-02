const $neutralIcon = document.getElementById("neutral");
const $happyIcon = document.getElementById("up");
const $thirstyIcon = document.getElementById("down");
const $surprisedIcon = document.getElementById("left");
const $angryIcon = document.getElementById("right");

const boxMessage = document.getElementById("boxMessage");
const messageText = document.getElementById("messageText");

document.addEventListener("DOMContentLoaded", function () {
  //
  var audio = new Audio('error.mp3');
  //
  var audio_fondo = new Audio('soundtrack.mp3')
  audio_fondo.play()
  const maze = document.getElementById("maze");
  let playerSquare = document.createElement("div");
  playerSquare.classList.add("player");
  var gameStarted = false;
  var gameStandby = true;
  var smileDetected = false;

  const mazeArray = [
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "", "X", "M", "", "", "", "", "", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
    ["X", "", "", "", "", "", "", "", "", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ];


//   const mazeArray = [
//     ["", "", "X"],
//     ["X", "", "X"],
//     ["X", "", "X"],
//     ["X", "", "X"],
//     ["X", "", "X"],
//     ["X", "", "X"],
//     ["X", "", "X"],
//     ["X", "", "X"],
//     ["X", "M", "X"],
//   ];

  const cells = [];

  // Create maze grid
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (mazeArray[i][j] === "X") {
        cell.classList.add("obstacle");
      }
      maze.appendChild(cell);
      cells.push(cell);
      if (mazeArray[i][j] === "M") {
        cell.classList.add("final");
      }
    }
  }

  // Initialize player in the top-left corner
  let playerPosition = mazeArray[0].length + 1;

  // Función para mover el cuadrado azul basado en la emoción reconocida
  function movePlayerSquare(emotion) {
    const row = Math.floor(playerPosition / mazeArray[0].length);
    const col = playerPosition % mazeArray[0].length;

    // Elimina el rastro del jugador antes de moverlo
    cells[playerPosition].classList.remove("player");

    // Lógica para controlar el juego basado en la emoción detectada
    if (gameStandby) {
      if (smileDetected && emotion === "Happy") {
        startGame();
      }
    } else if (gameStarted) {
      switch (emotion) {
        case "Neutral":
          $neutralIcon.classList.add("shine");
          setTimeout(() => {
            if ($neutralIcon.classList.contains("shine")) {
              $neutralIcon.classList.remove("shine");
            }
          }, 500);
          break;
        case "Happy": // Mueve hacia abajo
          $happyIcon.classList.add("shine");
          if (row + 1 < mazeArray.length && mazeArray[row + 1][col] !== "X") {
            playerPosition += mazeArray[0].length;
          }
          setTimeout(() => {
            if ($happyIcon.classList.contains("shine")) {
              $happyIcon.classList.remove("shine");
            }
          }, 500);
          break;
        case "Sad": // Mueve hacia arriba
          $thirstyIcon.classList.add("shine");
          if (row - 1 >= 0 && mazeArray[row - 1][col] !== "X") {
            playerPosition -= mazeArray[0].length;
          }
          setTimeout(() => {
            if ($thirstyIcon.classList.contains("shine")) {
              $thirstyIcon.classList.remove("shine");
            }
          }, 500);
          break;
        case "Surprise": // Mueve hacia la derecha
          $surprisedIcon.classList.add("shine");
          if (col + 1 < mazeArray[0].length && mazeArray[row][col + 1] !== "X") {
            playerPosition += 1;
          }
          setTimeout(() => {
            if ($surprisedIcon.classList.contains("shine")) {
              $surprisedIcon.classList.remove("shine");
            }
          }, 500);
          break;
        case "Angry": // Mueve hacia la izquierda
          $angryIcon.classList.add("shine");
          if (col - 1 >= 0 && mazeArray[row][col - 1] !== "X") {
            playerPosition -= 1;
          }
          setTimeout(() => {
            if ($angryIcon.classList.contains("shine")) {
              $angryIcon.classList.remove("shine");
            }
          }, 500);
          break;
        // Maneja otras emociones según sea necesario
      }

      // Mueve el jugador y actualiza la representación visual en el tablero
      playerSquare = cells[playerPosition];
      playerSquare.classList.add("player");

      // Check if the player reached the goal (customize the goal position as needed)
      if (playerPosition === 13 /*- mazeArray[0].length - 2*/) {
        alert("¡Felicidades! Has alcanzado la meta.");
        resetGame();
      }
    }
  }

  function startGame() {
    gameStandby = false;
    gameStarted = true;
    audio_fondo.play()
    //$player.classList.add("shine");

    // Oculta los elementos de inicio después de 2 segundos
    setTimeout(() => {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("foregroundSquare").style.display = "none";
      document.getElementById("startText").style.display = "none";
    }, 2000);

    setInterval(()=>{
      messageText.textContent = `
      Sonrie apliamente - 
      Cierra los ojos de tristeza - 
      Abre la boca de sorpresa - 
      Frunce el ceño de enojo 
      `
    }, 4000)

  }

  function pauseGame() {
    gameStarted = false;
  }

  function resetGame() {
    // Restablece los estados del juego
    gameStandby = true;
    gameStarted = false;
    smileDetected = false;

    // Muestra los elementos de inicio
    document.getElementById("overlay").style.display = "block";
    document.getElementById("foregroundSquare").style.display = "block";
    document.getElementById("startText").style.display = "block";

    // Restablece la posición del jugador
    cells[playerPosition].classList.remove("player");
    playerPosition = mazeArray[0].length + 1;
    cells[playerPosition].classList.add("player");
  }

  // Variables para almacenar el estado original del fondo y el contenido del texto
  let originalBackgroundColor;
  let originalTextContent;

  // Función para cambiar el color de fondo y el contenido del texto durante 2 segundos
  function changeBackgroundAndText() {
    const boxMessage = document.getElementById("boxMessage");
    const messageText = document.getElementById("messageText");

    // Guarda el estado original del fondo y el contenido del texto si aún no se ha guardado
    if (!originalBackgroundColor) {
      originalBackgroundColor = boxMessage.style.backgroundColor;
      originalTextContent = messageText.textContent;
    }

    // Cambia el fondo a rojo y el contenido del texto a "Peligro"
    boxMessage.style.backgroundColor = "red";
    messageText.textContent = "No presiones teclas, ¡solo juega con las emociones!";
    
    // Restaura el estado original después de 2 segundos
    setTimeout(() => {
      boxMessage.style.backgroundColor = originalBackgroundColor;
      messageText.textContent = originalTextContent;

      // Restablece las variables de estado original
      originalBackgroundColor = null;
      originalTextContent = null;
    }, 2000);
  }

  // Actualiza la posición del cuadrado azul cuando se reconoce una nueva emoción
  window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    const emotionEnIngles = evt.detail.output.dominantEmotion;
    if (emotionEnIngles === "Happy" && !smileDetected) {
      smileDetected = true;
      // Agregar un temporizador para esperar 2 segundos después de la detección de la sonrisa
      setTimeout(() => {
        movePlayerSquare(emotionEnIngles);
      }, 1000);
    } else {
      movePlayerSquare(emotionEnIngles);
    }
  });

  // Agregar la lógica para cambiar el color de fondo y el contenido del texto al presionar cualquier letra
  document.addEventListener("keydown", function (event) {
    if (event.key.match(/[a-zA-Z]/)) {
      changeBackgroundAndText();
      audio.play()
    }
  });
});
