//Variables globales
let gameStarted = false;
let gameStandby = true;

function game(map){
    let cells = createMapDOM(map); //cells has the references to DOM
    console.log("Cree el mapa")
    let player = {
        name: "Player",
        direction: 0,
        position: { row:  1, col: 1},
        counter: {
            happy: 0,
            sad: 0,
            angry: 0,
            surprise: 0
        },
        velocity: 10, //the counter has to reach this velocity to move
    }
    let audio = {
        audio_error : new Audio('assets/sounds/error.mp3'),
        audio_background : new Audio('assets/sounds/videoplayback.mp3')
    }
    let smileDetected = false;
    createMovementHelpers(player.position, map, cells)
    audio.audio_background.play()

    // Initialize player in the top-left corner
    player.direction = 0; //8 arriba, 2 abajo, 6 derecha, 4 izquierda

    

    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
        const emotionEnIngles = evt.detail.output.dominantEmotion;
        if (emotionEnIngles === "Happy" && !smileDetected) {
            smileDetected = true;
            setTimeout(() => {
                movePlayerSquare(player, map, cells, emotionEnIngles, smileDetected);
            }, 1000);
        } else {
            movePlayerSquare(player, map, cells, emotionEnIngles, smileDetected);
        }
    });

    document.addEventListener("keydown", forbidKeyPress);
}




//Game general functionalities

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
        messageText.textContent = "EMPEZO EL JUEGO DEL LABERINTO"
    }, 4000)
}


function resetGame() {
    gameStandby = true;
    gameStarted = false;
    smileDetected = false;

    document.getElementById("overlay").style.display = "block";
    document.getElementById("foregroundSquare").style.display = "block";
    document.getElementById("startText").style.display = "block";

    cells[player.position].classList.remove("player", "player-happy", "player-sad", "player-surprise", "player-angry");
    player.position = map[0].length + 1;
    cells[player.position].classList.add("player");
}


function reStartLevel5() {
    window.location.href = 'index.html';
}

function goToMenu() {
    window.location.href = 'interfaz.html';
}


//*************************  Other funtionalities **********************************
function forbidKeyPress(event){
    if (event.key.match(/[a-zA-Z]/)) {
        changeBackgroundAndText();
        audio.play()
    }
}

function displayEndLevelScreen(){
    let popup = document.getElementById("popup");
    popup.style.display = "block";
}

//Funcion para actualizar la caja de texto de mensaje al usuario
function changeBackgroundAndText() {
    let originalBackgroundColor;
    let originalTextContent;

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

//*************************  Game specific funtionalities **********************************
function createMapDOM(map){
    let cells = []; //it has references to each DOM element
    const $maze = document.getElementById("maze");
    for (let row of map) {
        for (let ele of row) {
            console.log(ele)
            const $cell = document.createElement("div");
            $cell.classList.add("cell");
            if (ele === "X") {
                $cell.classList.add("obstacle");
            }
            if (ele === "P") {
                $cell.classList.add("player");
            }
            if (ele === "M") {
                $cell.classList.add("final");
            }
            $maze.appendChild($cell);
            cells.push($cell);
        }
    }
    return cells
}
// Función para mover al jugador basado en la emoción reconocida
function movePlayerSquare(player, map, cells, emotion, smileDetected) {
    // Lógica para controlar el juego basado en la emoción detectada
    if (gameStandby) {
        if (smileDetected && emotion === "Happy") {
            startGame();
        }
    } else if (gameStarted) {
        const $neutralIcon = document.getElementById("neutral");
        const $happyIcon = document.getElementById("up");
        const $thirstyIcon = document.getElementById("down");
        const $surprisedIcon = document.getElementById("left");
        const $angryIcon = document.getElementById("right");
        switch (emotion) {
            case "Neutral":
                shineDOM($neutralIcon)
                break;
            case "Happy":
                player.counter.happy++;
                if(player.counter.happy > player.velocity){
                    player.counter.happy = 0;
                    player.direction = 2;
                    shineDOM($happyIcon)
                }
                break;
            case "Sad":
                player.counter.sad++;
                if(player.counter.sad > player.velocity){
                    player.counter.sad = 0;
                    player.direction = 8;
                    shineDOM($thirstyIcon)
                }
                break;
            case "Surprise":
                player.counter.surprise++;
                if(player.counter.surprise > player.velocity){
                    player.counter.surprise = 0;
                    player.direction = 6;
                    shineDOM($surprisedIcon)
                }
                break;
            case "Angry":
                player.counter.angry++;
                if(player.counter.angry > player.velocity){
                    player.counter.angry = 0;
                    player.direction = 4
                    shineDOM($angryIcon)
                }
                break;
        }
        //if the player has moved
        if(player.direction){
            // Delete player and helpers before move it
            if(player.direction === 2){
                if (player.position.row + 1 < map.length && 
                    map[player.position.row + 1][player.position.col] !== "X") {
                        deleteMovementHelpers(player.position, cells)
                        player.position.row++;
                        cells[(player.position.row)  * 10 + player.position.col].classList.add("player", `player-${emotion.toLowerCase()}`);
                        createMovementHelpers(player.position, map, cells)
                }
            }
            if(player.direction === 8){
                if (player.position.row - 1 >= 0 && 
                    map[player.position.row - 1][player.position.col] !== "X") {
                        deleteMovementHelpers(player.position, cells)
                        player.position.row--;
                        cells[(player.position.row)  * 10 + player.position.col].classList.add("player", `player-${emotion.toLowerCase()}`);
                        createMovementHelpers(player.position, map, cells)
                }
            }
            if(player.direction === 6){
                if (player.position.col + 1 < map[0].length && 
                    map[player.position.row][player.position.col + 1] !== "X") {
                        deleteMovementHelpers(player.position, cells)
                        player.position.col += 1;
                        cells[(player.position.row)  * 10 + player.position.col].classList.add("player", `player-${emotion.toLowerCase()}`);
                        createMovementHelpers(player.position, map, cells)
                }
            }
            if(player.direction === 4){
                if (player.position.col - 1 >= 0 && 
                    map[player.position.row][player.position.col - 1] !== "X") {
                        deleteMovementHelpers(player.position, cells)
                        player.position.col -= 1;
                        cells[(player.position.row)  * 10 + player.position.col].classList.add("player", `player-${emotion.toLowerCase()}`);
                        createMovementHelpers(player.position, map, cells)
                }
            }
            player.direction = 0;
            console.log(player.position)
        }

        // Check if the player reached the goal (customize the goal position as needed)
        if (cells[player.position.row *  10 + player.position.col].classList.contains('final')) {
            displayEndLevelScreen()
        }
    }
}
//Add helpers to new position, it needs the map [[]]
function createMovementHelpers(position, map, cells){
    if(map[position.row + 1][position.col] === ""){
        cells[(position.row + 1)*10 + position.col].classList.remove("cell");
        cells[(position.row + 1)*10 + position.col].classList.add("help-happy")
    }
    if(map[position.row - 1][position.col] === ""){
        cells[(position.row - 1)*10 + position.col].classList.remove("cell");
        cells[(position.row - 1)*10 + position.col].classList.add("help-sad")
    }
    if(map[position.row][position.col + 1] === ""){
        cells[(position.row)*10 + position.col + 1].classList.remove("cell");
        cells[(position.row)*10 + position.col + 1].classList.add("help-surprise")
    }
    if(map[position.row][position.col - 1] === ""){
        cells[(position.row)*10 + position.col - 1].classList.remove("cell");
        cells[(position.row)*10 + position.col - 1].classList.add("help-angry")
    }
}
// Delete player and helpers before move it
function deleteMovementHelpers(position, cells){
    cells[(position.row)*10 + position.col].classList.remove("player", "player-happy", "player-sad", "player-surprise", "player-angry");
    cells[(position.row)*10 + position.col].classList.add("cell");
    cells[(position.row + 1)*10 + position.col].classList.remove("help-happy", "help-sad", "help-surprise", "help-angry")
    cells[(position.row + 1)*10 + position.col].classList.add("cell")
    cells[(position.row - 1)*10 + position.col].classList.remove("help-happy", "help-sad", "help-surprise", "help-angry")
    cells[(position.row - 1)*10 + position.col].classList.add("cell")
    cells[(position.row)*10 + position.col + 1].classList.remove("help-happy", "help-sad", "help-surprise", "help-angry")
    cells[(position.row)*10 + position.col + 1].classList.add("cell")
    cells[(position.row)*10 + position.col - 1].classList.remove("help-happy", "help-sad", "help-surprise", "help-angry")
    cells[(position.row)*10 + position.col - 1].classList.add("cell")
}

//Funcion para hacer brillar un elemento del DOM
function shineDOM($ele){
    $ele.classList.add("shine");
    setTimeout(() => {
        if ($ele.classList.contains("shine")) {
            $ele.classList.remove("shine");
        }
    }, 500);
}