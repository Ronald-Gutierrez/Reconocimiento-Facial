document.addEventListener("DOMContentLoaded", function() {
    const maze = document.getElementById("maze");
    let playerSquare = document.createElement("div");
    playerSquare.classList.add("player");

    const mazeArray = [
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X",],
        ["X", "", "", "", "X", "", "", "", "", "X",],
        ["X", "", "X", "", "", "", "X", "X", "", "X",],
        ["X", "", "", "", "X", "", "", "X", "", "X",],
        ["X", "", "", "", "", "X", "", "", "", "X",],
        ["X", "X", "X", "", "", "", "", "X", "", "X",],
        ["X", "", "", "", "X", "", "", "", "", "X",],
        ["X", "", "", "", "", "", "X", "", "M", "X",],
        ["X", "X", "X", "X", "X","X", "X", "X", "X","X"]
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
        cells[playerPosition].classList.remove("player");

        switch(emotion) {
            case "Happy": // Mueve hacia abajo
                if (row + 1 < mazeArray.length && mazeArray[row + 1][col] !== "X") {
                    playerPosition += mazeArray[0].length;
                }
                break;
            case "Sad": // Mueve hacia arriba
                if (row - 1 >= 0 && mazeArray[row - 1][col] !== "X") {
                    playerPosition -= mazeArray[0].length;
                }
                break;
            case "Surprise": // Mueve hacia la derecha
                if (col + 1 < mazeArray[0].length && mazeArray[row][col + 1] !== "X") {
                    playerPosition += 1;
                }
                break;
            case "Angry": // Mueve hacia la izquierda
                if (col - 1 >= 0 && mazeArray[row][col - 1] !== "X") {
                    playerPosition -= 1;
                }
                break;
            // Maneja otras emociones según sea necesario
        }
        

        // Mueve el jugador y actualiza la representación visual en el tablero
        playerSquare = cells[playerPosition];
        playerSquare.classList.add("player");
        // Check if the player reached the goal (customize the goal position as needed)
        if (playerPosition === cells.length - mazeArray[0].length-2) {
            alert("¡Felicidades! Has alcanzado la meta.");
            resetGame();
        }
    }
    function resetGame() {
        cells[playerPosition].classList.remove("player");
        playerPosition = mazeArray[0].length + 1;
        cells[playerPosition].classList.add("player");
    }
    // Actualiza la posición del cuadrado azul cuando se reconoce una nueva emoción
    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
        const emotionEnIngles = evt.detail.output.dominantEmotion;
        movePlayerSquare(emotionEnIngles);
    });
});
