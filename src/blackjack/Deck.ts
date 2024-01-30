import Card from "./Card";

class Deck {
    private suits: string[];
    private values: string[];
    private deck: Card[];
    
    constructor() {
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.deck = [];

        this.initializeDeck();
    }

    initializeDeck() {
        this.suits.forEach(suit => {
            this.values.forEach(value => {
                this.deck.push(new Card(suit, value));
            });
        });
    }

    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    dealCard() {
        return this.deck.pop();
    }
}

export default Deck;