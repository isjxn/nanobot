class Card {
    suit: string;
    value: string;
    
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    getCardString() {
        return this.value + ' of ' + this.suit;
    }

    getCardValue() {
        if (this.value === 'A') {
            return 11;
        } else if (['J', 'Q', 'K'].includes(this.value)) {
            return 10;
        } else {
            return parseInt(this.value);
        }
    }
}

export default Card;