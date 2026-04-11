const deck = [];

// Initialize the deck content
exports.init = function() {
    deck.length = 0;

    // Add the cards to the deck
    for (const suit of ["C", "D", "H", "S"]) {
        for (const rank of ["2", "3", "4", "5", "6", "7", "8", "9", "T",
                            "J", "Q", "K", "A"]) {
            deck.push(rank + suit);
        }
    }

    // Shuffle the cards
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
};

exports.draw = function() {
    return deck.shift();
};

exports.size = function() {
    return deck.length;
};
