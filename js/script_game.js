//Variables globales
let gameStarted = false;
let gameStandby = true;
let audio = {
    audio_error : new Audio('../assets/sounds/error.mp3'),
    audio_background : new Audio('../assets/sounds/videoplayback.mp3')
}
function game(map, level, counter_value){
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
        velocity: 8, //the counter has to reach this velocity to move
    }
    
    let smileDetected = true;
    createMovementHelpers(player.position, map, cells, level)
    audio.audio_background.volume = 0.4
    audio.audio_background.play()

    // Initialize player in the top-left corner
    player.direction = 0; //8 arriba, 2 abajo, 6 derecha, 4 izquierda

    startGame(counter_value)
    /*
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
    */
    let photo = document.createElement('canvas');
    let photoValue = false;
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

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.getElementById('video-container').append(canvas);
        const displaySize = { width: video.width, height: video.height };
        const emotion = document.getElementById('emotion-id');
        faceapi.matchDimensions(canvas, displaySize);
    
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            //const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            
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
                if(!photoValue){
                    photoValue = decideTakePhoto(maxEmotion,level, photo, photoValue,  video)
                    //var photoInterval = setInterval(()=>{
                        //photoValue = decideTakePhoto(maxEmotion,level, photo, photoValue,  video, photoInterval)
                        //if(photoValue){
                            //clearInterval(photoInterval)
                        //}
                    //}, 500)
                }
    
                if (maxEmotion === "happy" && !smileDetected) {
                    smileDetected = true;
                    setTimeout(() => {
                        movePlayerSquare(player, map, cells, maxEmotion, smileDetected, level);
                    }, 1000);
                } else {
                    movePlayerSquare(player, map, cells, maxEmotion, smileDetected, level);
                }
            }
    
        }, 100);
    })


    document.addEventListener("keydown", forbidKeyPress);
}

function decideTakePhoto(emotion, level,  photo, photoValue,  video){
    if(!photoValue){
        if( level === 1 && emotion === 'happy'){
            takePhoto(photo, video)
            savePhoto(photo)
            return true
        }
        if( level === 2 && emotion === 'surprised'){
            takePhoto(photo, video)
            savePhoto(photo)
            return true
        }
        if( level === 3 && emotion === 'sad'){
            takePhoto(photo, video)
            savePhoto(photo)
            return true
        }
        if( level === 4 && emotion === 'angry'){
            takePhoto(photo, video)
            savePhoto(photo)
            return true
        }
        if( level === 5 && emotion === 'angry'){
            takePhoto(photo, video)
            savePhoto(photo)
            return true;
        }
        return false
    }
    return false
}

function takePhoto(photo, video){
    photo.width = video.videoWidth;
    photo.height = video.videoHeight;
    const context = photo.getContext('2d');
    context.drawImage(video, 0, 0, photo.width, photo.height);
}

function savePhoto(photo){
    console.log("save photo")
    let imageRef = document.getElementById('imageResult')
    imageRef.src = photo.toDataURL('image/png')
    // Crear un enlace (a) para descargar la imagen
    //const link = document.createElement('a');
    //link.href = photo.toDataURL('image/png');
    //link.download = 'captura.png';

    // Simular un clic en el enlace para descargar la imagen
    //link.click();
}


//Game general functionalities

function startGame(counter_value) {
    gameStandby = false;
    gameStarted = true;
    //audio_fondo.play()
   

    setInterval(() => {
        messageText.textContent = "EMPEZO EL JUEGO DEL LABERINTO"
    }, 4000)
    const counter = document.getElementById('counter');
    counter.textContent = counter_value
    const counter_level = setInterval(()=>{
        if(gameStarted){
            if(!gameStandby && counter.textContent > 0){
                counter.textContent = counter.textContent - 1
                if(counter.textContent < 10){
                    increaseAlert(counter)
                }
            }else{
                clearInterval(counter_level);
                finishGameLose();
            }
        }
    }, 1000)
}

function increaseAlert(ele){
    console.log("Increase alert")
    ele.style.color = "red"
    ele.style.fontSize = '2.5rem';
    setTimeout(() => {
        ele.style.fontSize = '2rem';
    }, 500);
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

function finishGameLose(){
    gameStandby = false;
    gameStarted = false;
    let popup = document.getElementById("popup-loss");
    popup.style.display = "block";
}

function finishGameVictory(){
    gameStandby = false;
    gameStarted = false;
    const counter = document.getElementById('counter');
    const $points = document.getElementById('points');
    $points.textContent = counter.textContent + ' '
    let popup = document.getElementById("popup");
    popup.style.display = "block";
}


//*************************  Other funtionalities **********************************
function forbidKeyPress(event){
    if (event.key.match(/[a-zA-Z]/)) {
        audio.audio_error.play()
        changeBackgroundAndText();
    }
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
    }, 4000);
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
function movePlayerSquare(player, map, cells, emotion, smileDetected, level) {
    // Lógica para controlar el juego basado en la emoción detectada
    if (gameStandby) {
        if (smileDetected && emotion === "happy") {
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
                if($neutralIcon)
                    shineDOM($neutralIcon)
                break;
            case "happy":
                player.counter.happy++;
                if(player.counter.happy > player.velocity){
                    player.counter.happy = 0;
                    player.direction = 2;
                    if($happyIcon)
                        shineDOM($happyIcon)
                }
                break;
            case "sad":
                player.counter.sad++;
                if(player.counter.sad > player.velocity){
                    player.counter.sad = 0;
                    player.direction = 8;
                    if($thirstyIcon)
                        shineDOM($thirstyIcon)
                }
                break;
            case "surprised":
                player.counter.surprise++;
                if(player.counter.surprise > player.velocity){
                    player.counter.surprise = 0;
                    player.direction = 6;
                    if($surprisedIcon)
                        shineDOM($surprisedIcon)
                }
                break;
            case "angry":
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
                        createMovementHelpers(player.position, map, cells, level)
                }
            }
            if(player.direction === 8){
                if (player.position.row - 1 >= 0 && 
                    map[player.position.row - 1][player.position.col] !== "X") {
                        deleteMovementHelpers(player.position, cells)
                        player.position.row--;
                        cells[(player.position.row)  * 10 + player.position.col].classList.add("player", `player-${emotion.toLowerCase()}`);
                        createMovementHelpers(player.position, map, cells, level)
                }
            }
            if(player.direction === 6){
                if (player.position.col + 1 < map[0].length && 
                    map[player.position.row][player.position.col + 1] !== "X") {
                        deleteMovementHelpers(player.position, cells)
                        player.position.col += 1;
                        cells[(player.position.row)  * 10 + player.position.col].classList.add("player", `player-${emotion.toLowerCase()}`);
                        createMovementHelpers(player.position, map, cells, level)
                }
            }
            if(player.direction === 4){
                if (player.position.col - 1 >= 0 && 
                    map[player.position.row][player.position.col - 1] !== "X") {
                        deleteMovementHelpers(player.position, cells)
                        player.position.col -= 1;
                        cells[(player.position.row)  * 10 + player.position.col].classList.add("player", `player-${emotion.toLowerCase()}`);
                        createMovementHelpers(player.position, map, cells, level)
                }
            }
            player.direction = 0;
            console.log(player.position)
        }

        // Check if the player reached the goal (customize the goal position as needed)
        if (cells[player.position.row *  10 + player.position.col].classList.contains('final')) {
            finishGameVictory()
        }
    }
}


//Add helpers to new position, it needs the map [[]]
function createMovementHelpers(position, map, cells, level){
    if(map[position.row + 1][position.col] === ""){
        cells[(position.row + 1)*10 + position.col].classList.remove("cell");
        cells[(position.row + 1)*10 + position.col].classList.add("help-happy")
    }
    if(map[position.row - 1][position.col] === "" && level>=3){
        cells[(position.row - 1)*10 + position.col].classList.remove("cell");
        cells[(position.row - 1)*10 + position.col].classList.add("help-sad")
    }
    if(map[position.row][position.col + 1] === ""){
        cells[(position.row)*10 + position.col + 1].classList.remove("cell");
        cells[(position.row)*10 + position.col + 1].classList.add("help-surprise")
    }
    if(map[position.row][position.col - 1] === "" && level>=4){
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