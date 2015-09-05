/*jshint esnext: true */

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

export default class Card {
	constructor(suit, val) {
		this.suit = suit;
		this.val = val;
	}
	toString() {
		return this.suit + this.val;
	}
	getPoints(total) {
		if(this.val === "A") {
			return 1;
		}
		else if(["Q", "J", "K"].contains(this.val)) {
			return 10;
		}
		else {
			return parseInt(this.val);
		}
	}
}
