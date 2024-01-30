import Card from "./Card";

class Hand {
    cards: Card[];
    score: number;
    
    constructor() {
        this.cards = [];
        this.score = 0;
    }

    addCard(card) {
        this.cards.push(card);
        this.updateScore();
    }

    updateScore() {
        this.score = this.cards.reduce((acc, card) => acc + card.getCardValue(), 0);
        
        // Adjust for aces
        let aces = this.cards.filter(card => card.value === 'A').length;
        while (this.score > 21 && aces > 0) {
            this.score -= 10;
            aces--;
        }
    }

    getScore() {
        return this.score;
    }

    getHandString() {
        return this.cards.map(card => card.getCardString()).join(', ');
    }
}

export default Hand;