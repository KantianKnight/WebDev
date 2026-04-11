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

            // Add your code here

        });

        $("#confirm-hand-button").on("click", function() {
            //
            // Confirm the hand for the player by sending
            // a GET request to the server
            //

            // Add your code here

        });
    }

    return { init };
})();
