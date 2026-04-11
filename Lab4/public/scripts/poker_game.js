const PokerGame = (function() {
    // This stores the player's hand
    let player = [];

    const init = function() {
        $("#start-game-button").on("click", function() {
            // Ask the server to start the game
            fetch("/start")
                .then((res) => res.json())
                .then((json) => {
                    if (json.error) {
                        alert(json.error);
                        return;
                    }

                    // Show the game play area
                    $("#card-game-start-page").hide();
                    $("#card-game-play-page").show();

                    // Show an empty hand for the computer
                    Hand.draw($("#computer-hand"), new Array(5), false);

                    //
                    // Get and show the player's hand
                    //

                    // Add your code here
                    // true makes the cards clickable for replacement
                    Hand.draw($("#player-hand"), json.hand, true);
                })
                .catch((err) => { alert(err); });
        });

        $("#replace-cards-button").on("click", function() {
            // Construct the cards to be replaced
            const cards = [];
            $("#player-hand .flipped").each(function(idx, el) {
                cards.push($(el).attr("data-card"));
            });
            const json = JSON.stringify({ cards });

            //
            // Replace the cards for the player by
            // sending a POST request to the server
            //

            fetch("/replacecards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: json
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.error) {
                        alert(json.error);
                        return;
                    }
                    
                    // Show the player's new hand
                    Hand.draw($("#player-hand"), json.hand, true);
                })
                .catch((err) => { alert(err); });
        });

        $("#confirm-hand-button").on("click", function() {
            //
            // Confirm the hand for the player by sending
            // a GET request to the server
            //

            // Add your code here
            fetch("/confirm", { method: "GET" })
                .then((res) => res.json())
                .then((json) => {
                    if (json.error) {
                        alert(json.error);
                        return;
                    }
                    
                    // Show the player's and computer's hands
                    Hand.draw($("#player-hand"), json.player.hand, true);
                    Hand.draw($("#computer-hand"), json.computer.hand, true);
                    
                    // Show the game result
                    if (json.winner == 1)
                        $("#result").text("You win!");
                    else
                        $("#result").text("The computer wins!");
                    $("#result").show();
                })
                .catch((err) => { alert(err); });

        });
    }

    return { init };
})();
