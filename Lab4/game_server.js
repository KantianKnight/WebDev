const express = require("express");

// Additional packages for dealing with the cards
const deck = require("./deck");
const pokerHandUtils = require("poker-hand-utils");

// Create the Express app
const app = express();

// Use the 'public' folder to serve static files
app.use(express.static("public"));

// Use the json middleware to parse JSON data
app.use(express.json());

// This stores the player's hand and computer's hand
let player = [];
let computer = [];

// This is the replacement count
let remainingCount = 2;

// Handle the /start endpoint
app.get("/start", (req, res) => {
    // Initialize the cards
    deck.init();

    // Reset the game content
    player = [];
    computer = [];
    remainingCount = 2;

    //
    // Draw 5 initial cards for both the player and computer
    //

    // Add your code here

    // Return the hand
    res.json({ hand: [] });
});

// Handle the /replace endpoint
app.post("/replacecards", (req, res) => {
    // Get the JSON data from the body
    const { cards } = req.body;

    // Check the hand sizes
    if (player.length != 5) {
        res.json({ error: "The game has finished!" });
        return;
    }

    // Check the remaining count
    if (remainingCount == 0) {
        res.json({ error: "You have no more replacement left!" });
        return;
    }
    remainingCount--;

    //
    // Replace the cards
    //

    // Add your code here

    // Return the hand
    res.json({ hand: [] });
});

// Handle the /confirm endpoint
app.get("/confirm", (req, res) => {
    // Check the hand sizes
    if (player.length != 5) {
        res.json({ error: "The game has finished!" });
        return;
    }

    // Create PokerHand objects
    player = pokerHandUtils.createPokerHand(player.join(" "));
    computer = pokerHandUtils.createPokerHand(computer.join(" "));

    // Evaluate the hands and the winner
    const winner = pokerHandUtils.compareTo(player, computer);
    
    // Return the result and the hands
    const result = {
        winner,
        player: pokerHandUtils.getDescription(player),
        computer: pokerHandUtils.getDescription(computer)
    };

    res.json(result);
});

// Use a web server to listen at port 8000
app.listen(8000, () => {
    console.log("The game server has started...");
});
