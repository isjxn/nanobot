import Deck from "./Deck";
import Hand from "./Hand";

class BlackjackGame {
    deck: Deck;
    playerHand: Hand;
    dealerHand: Hand;

    constructor() {
        this.deck = new Deck();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        this.deck.shuffle();
    }

    startNewGame() {
        this.playerHand = new Hand();
        this.dealerHand = new Hand();

        this.playerHand.addCard(this.deck.dealCard());
        this.playerHand.addCard(this.deck.dealCard());
        this.dealerHand.addCard(this.deck.dealCard());
        this.dealerHand.addCard(this.deck.dealCard());

        console.log("Player's hand:", this.playerHand.getHandString());
        console.log("Dealer's hand:", this.dealerHand.getHandString());
    }

    getPlayerHand() {
        return this.playerHand;
    }

    hitPlayer() {
        this.playerHand.addCard(this.deck.dealCard());
        console.log("Player hits.");
        console.log("Player's hand:", this.playerHand.getHandString());
        if (this.playerHand.getScore() > 21) {
            console.log("Player busts!");
            return true;
        }
        return false;
    }

    dealerPlays() {
        console.log("Dealer's turn.");
        while (this.dealerHand.getScore() < 17) {
            this.dealerHand.addCard(this.deck.dealCard());
            console.log("Dealer's hand:", this.dealerHand.getHandString());
        }
        if (this.dealerHand.getScore() > 21) {
            console.log("Dealer busts!");
            return true;
        }
        return false;
    }

    checkWinner() {
        if (this.playerHand.getScore() > 21) {
            console.log("Dealer wins!");
            return "Dealer";
        } else if (this.dealerHand.getScore() > 21) {
            console.log("Player wins!");
            return "Player";
        } else if (this.playerHand.getScore() > this.dealerHand.getScore()) {
            console.log("Player wins!");
            return "Player";
        } else if (this.playerHand.getScore() < this.dealerHand.getScore()) {
            console.log("Dealer wins!");
            return "Dealer";
        } else {
            console.log("It's a tie!");
            return "Tie";
        }
    }
}

export default BlackjackGame;