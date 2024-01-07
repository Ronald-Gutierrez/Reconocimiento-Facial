/* *************************************** */
/* *************************************** */

const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

/* *************************************** */
/* *************************************** */

const $neutralIcon = document.getElementById("neutral");
const $happyIcon = document.getElementById("up");
const $thirstyIcon = document.getElementById("down");
const $surprisedIcon = document.getElementById("left");
const $angryIcon = document.getElementById("right");

const boxMessage = document.getElementById("boxMessage");
const messageText = document.getElementById("messageText");

var audio = new Audio('../audio/error.mp3');
var audio_fondo = new Audio('../audio/soundtrack.mp3')
audio_fondo.play()

const maze = document.getElementById("maze");
let playerSquare = document.createElement("div");
playerSquare.classList.add("player");
let gameStarted = false;
let gameStandby = true;
let smileDetected = false;
let band = true;

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

let playerPosition = mazeArray[0].length + 1;
$neutralIcon.classList.add("shine");

function startGame() {
    gameStandby = false;
    gameStarted = true;
    audio_fondo.play()

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

function movePlayerSquare(emotion) {
    const row = Math.floor(playerPosition / mazeArray[0].length);
    const col = playerPosition % mazeArray[0].length;

    // Elimina el rastro del jugador antes de moverlo
    cells[playerPosition].classList.remove("player", "player-happy", "player-sad", "player-surprised", "player-angry");

    // Lógica para controlar el juego basado en la emoción detectada
    if (gameStandby) {
        if (smileDetected && emotion === "happy") {
            startGame();
        }
    } else if (gameStarted && band) {
        switch (emotion) {
            case "neutral":
                $neutralIcon.classList.add("shine");
                setTimeout(() => {
                    if ($neutralIcon.classList.contains("shine")) {
                        $neutralIcon.classList.remove("shine");
                    }
                }, 500);
                break;
            case "happy":
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
            case "sad":
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
            case "surprised":
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
            case "angry":
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

        playerSquare = cells[playerPosition];
        playerSquare.classList.add("player", `player-${emotion.toLowerCase()}`);

        // Check if the player reached the goal (customize the goal position as needed)
        if (playerPosition === cells.length - mazeArray[0].length - 2) {
            band = false
            let popup = document.getElementById("popup");
            popup.style.display = "block";

            document.getElementById("arrow").hidden = true;

            let elementosMaterial = document.getElementsByClassName("material-symbols-outlined");

            for (var i = 0; i < elementosMaterial.length; i++) {
                elementosMaterial[i].style.display = "none";
            }
        }
    }
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.getElementById('video-container').append(canvas);
    const displaySize = { width: video.width, height: video.height };
    const emotion = document.getElementById('emotion-id');
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        let generalEmotion = detections[0]?.expressions;

        if (generalEmotion) {
            const [maxEmotion, maxScore] = Object.entries(generalEmotion)
                .reduce((acc, [emotion, score]) => (score > acc[1] ? [emotion, score] : acc), ['', -1]);

            emotion.innerText = maxEmotion;

            if (maxEmotion === "happy" && !smileDetected) {
                smileDetected = true;
                setTimeout(() => {
                    movePlayerSquare(maxEmotion);
                }, 1000);
            } else {
                movePlayerSquare(maxEmotion);
            }
        }

    }, 100);
})

function cerrarPopup() {
    window.location.href = 'index.html';
}

function pasarAlSiguienteNivel() {
    window.location.href = 'index.html';
}