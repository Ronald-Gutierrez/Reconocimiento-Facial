const $neutralIcon = document.getElementById("neutral");
const $happyIcon = document.getElementById("up");
const $thirstyIcon = document.getElementById("down");
const $surprisedIcon = document.getElementById("left");
const $angryIcon = document.getElementById("right");

const boxMessage = document.getElementById("boxMessage");
const messageText = document.getElementById("messageText");

document.addEventListener("DOMContentLoaded", function () {
    var audio = new Audio('error.mp3');
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
        ["X", "", "", "", "X", "", "", "", "", "X"],
        ["X", "", "X", "", "", "", "X", "X", "", "X"],
        ["X", "", "", "", "X", "", "", "X", "", "X"],
        ["X", "", "", "", "", "X", "", "", "", "X"],
        ["X", "X", "X", "", "", "", "", "X", "", "X"],
        ["X", "", "", "", "X", "", "", "", "", "X"],
        ["X", "", "", "", "", "", "X", "", "M", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ];

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
        cells[playerPosition].classList.remove("player", "player-happy", "player-sad", "player-surprise", "player-angry");

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
                case "Happy":
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
                case "Sad":
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
                case "Surprise":
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
                case "Angry":
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
            }

            // Mueve el jugador y actualiza la representación visual en el tablero
            playerSquare = cells[playerPosition];
            playerSquare.classList.add("player", `player-${emotion.toLowerCase()}`);

            // Check if the player reached the goal (customize the goal position as needed)
            if (playerPosition === cells.length - mazeArray[0].length - 2) {
                var popup = document.getElementById("popup");
                popup.style.display = "block";

                document.getElementById("up").hidden = true;
                document.getElementById("down").hidden = true;
                document.getElementById("left").hidden = true;
                document.getElementById("right").hidden = true;

                let elementosMaterial = document.getElementsByClassName("material-symbols-outlined");

                for (var i = 0; i < elementosMaterial.length; i++) {
                    elementosMaterial[i].style.display = "none";
                }
            }
        }
    }

    function startGame() {
        gameStandby = false;
        gameStarted = true;
        audio_fondo.play()

        // Oculta los elementos de inicio después de 2 segundos
        setTimeout(() => {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("foregroundSquare").style.display = "none";
            document.getElementById("startText").style.display = "none";
        }, 2000);

        setInterval(() => {
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
        gameStandby = true;
        gameStarted = false;
        smileDetected = false;

        document.getElementById("overlay").style.display = "block";
        document.getElementById("foregroundSquare").style.display = "block";
        document.getElementById("startText").style.display = "block";

        cells[playerPosition].classList.remove("player", "player-happy", "player-sad", "player-surprise", "player-angry");
        playerPosition = mazeArray[0].length + 1;
        cells[playerPosition].classList.add("player");
    }

    let originalBackgroundColor;
    let originalTextContent;

    function changeBackgroundAndText() {
        const boxMessage = document.getElementById("boxMessage");
        const messageText = document.getElementById("messageText");

        if (!originalBackgroundColor) {
            originalBackgroundColor = boxMessage.style.backgroundColor;
            originalTextContent = messageText.textContent;
        }

        boxMessage.style.backgroundColor = "red";
        messageText.textContent = "No presiones teclas, ¡solo juega con las emociones!";

        setTimeout(() => {
            boxMessage.style.backgroundColor = originalBackgroundColor;
            messageText.textContent = originalTextContent;

            originalBackgroundColor = null;
            originalTextContent = null;
        }, 2000);
    }

    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
        const emotionEnIngles = evt.detail.output.dominantEmotion;
        if (emotionEnIngles === "Happy" && !smileDetected) {
            smileDetected = true;
            setTimeout(() => {
                movePlayerSquare(emotionEnIngles);
            }, 1000);
        } else {
            movePlayerSquare(emotionEnIngles);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key.match(/[a-zA-Z]/)) {
            changeBackgroundAndText();
            audio.play()
        }
    });
});

function cerrarPopup() {
    window.location.href = 'interfaz.html';
}

function pasarAlSiguienteNivel() {
    window.location.href = 'index.html';
}
