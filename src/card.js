/*jshint esnext: true */
export default class Card {
	constructor(suit, value) {
		this.suit = suit;
		this.value = value;
	}
	toString() {
		return this.suit + this.value;
	}
}
