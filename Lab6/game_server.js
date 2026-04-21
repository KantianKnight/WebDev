const express = require("express");

// Create the Express app
const app = express();

// Use the 'public' folder to serve static files
app.use(express.static("public"));

// Create the Socket.IO server
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);

// A JavaScript object storing the players
let players = {}

// Indicate whether a game has started
let gameStarted = false;

// Handle the web socket connection
io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    // Wait for a player to join the game
    socket.on("join", (name) => {
        //
        // Handle the three error cases
        //

        // Add your code here
        if (gameStarted) {
            socket.emit("join_error", "The game has already started.");
            return;
        }

        if (Object.keys(players).length >= 4) {
            socket.emit("join_error", "The game is already full.");
            return;
        }

        for (const id in players) {
            if (players[id].name == name) {
                socket.emit("join_error", "The name is already taken.");
                return;
            }
        }

        // Put the player in the players object
        players[socket.id] = { name, ready: false };

        //
        // Send a success response to the browser
        //
        socket.emit("join_success", players[socket.id]); 

        //
        // For the main page: broadcast the players to the connected browsers
        //

        // Add your code here
        io.emit("update_players", players);

        console.log("Current players -", players); // DON'T DELETE - FOR MARKING
    });

    const startGame = function() {
        //
        // Tell the browsers to start the game
        //

        // Add your code here
        io.emit("game_start", players);

        gameStarted = true;
    };

    // Wait for a player to get ready in the game
    socket.on("ready", () => {
        // Mark the player as ready
        players[socket.id]["ready"] = true;

        //
        // Broadcast the players to the connected browsers
        //

        // Add your code here
        io.emit("update_players", players);

        //
        // Check if everybody is ready;
        // if so, start the game automatically
        //

        // Add your code here
        notAllReady = false;
        for (const id in players) {
            if (players[id].ready == false) {
                notAllReady = true;
                break
            }
        }

        if (!notAllReady) {
            startGame();
        }

        console.log("Current players -", players); // DON'T DELETE - FOR MARKING
    });

    const finishGame = function() {
        //
        // Tell the browsers the game has finished
        //

        // Add your code here
        io.emit("game_end", players);

        // Reset the game
        players = {};
        gameStarted = false;
    };

    // Set up the choose event
    socket.on("choose", (sign) => {
        // Assign the sign to the player
        players[socket.id]["sign"] = sign;

        //
        // Check if everybody has selected a hand sign;
        // if so, the game will finish
        //

        // Add your code here
        notAllChosen = false;
        for (const id in players) {
            if (!players[id].sign) {
                notAllChosen = true;
                break;
            }
        }

        if (!notAllChosen) {
            finishGame();
        }

        console.log("Current players -", players); // DON'T DELETE - FOR MARKING
    });

    // In case a player is disconnected from the game
    socket.on("disconnect", () => {
        // Remove the player from the game
        if (players[socket.id]) {
            delete players[socket.id];

            // Broadcast the players to the connected browsers
            io.emit("update_players", players);
        }
    });
});

// Use a web server to listen at port 8000
// Note that httpServer is used for a WebSocket server
httpServer.listen(8000, () => {
    console.log("The game server has started...");
});
