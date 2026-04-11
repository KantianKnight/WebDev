const Hand = (function() {
    // Draws a hand in an element
    const draw = function(el, hand, clickable=true) {
        el.html("");

        for (const card of hand) {
            if (card) {
                // Handle click
                let clickableCls = "";
                if (clickable) clickableCls = "clickable";
                
                // Handle the rank
                let rank = card[0];
                if (rank == "T") rank = "10"

                // Handle the suit
                let suit = card[1];
                const color = {"D": "red", "C": "", "H": "red", "S": ""}
                const suits = {"D": "&diams;", "C": "&clubs;",
                               "H": "&hearts;", "S": "&spades;"};

                // Add the card to the area
                el.append(
                   `<div class="card ${clickableCls}" data-card="${card}">
                        <div>
                            <div class="rank ${color[suit]}">${rank}</div>
                            <div class="suit ${color[suit]}">${suits[suit]}</div>
                        </div>
                        <div>
                            <div class="rank ${color[suit]}">${rank}</div>
                            <div class="suit ${color[suit]}">${suits[suit]}</div>
                        </div>
                    </div>`
                );
            }
            else {
                // Add a blank and flipped card to the area
                el.append('<div class="card flipped"></div>');
            }
        }

        if (clickable) {
            el.find(".card").on("click", function() {
                $(this).toggleClass("flipped");
            });
        }
    };

    return { draw };
})();
