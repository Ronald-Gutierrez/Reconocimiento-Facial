document.addEventListener("DOMContentLoaded", function() {
    const maze = document.getElementById("maze");
    const player = document.createElement("div");
    player.classList.add("player");

    // maze.appendChild(player);

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
    cells[playerPosition].classList.add("player");

    document.addEventListener("keydown", function(e) {
        switch(e.key) {
            case "ArrowUp":
                movePlayer(-mazeArray[0].length);
                break;
            case "ArrowDown":
                movePlayer(mazeArray[0].length);
                break;
            case "ArrowLeft":
                movePlayer(-1);
                break;
            case "ArrowRight":
                movePlayer(1);
                break;
        }
    });

    function movePlayer(direction) {
        const newPosition = playerPosition + direction;

        // Check if the new position is within bounds
        if (newPosition >= 0 && newPosition < cells.length) {
            // Check for walls or other obstacles (you can customize this part)
            if (!cells[newPosition].classList.contains("obstacle")) {
                // Move the player
                cells[playerPosition].classList.remove("player");
                playerPosition = newPosition;
                cells[playerPosition].classList.add("player");
            }
        }

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
});
