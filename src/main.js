/*jshint esnext: true */
require('./index.css');

import _ from "lodash";

import Card from "./card.js";

let cardVals = ['A','A',"A",'A'];
let cardSuits = ['S','H',"D","C"];
let deck = [];
let usedDeck = [];

let myHand = [];
let dealerHand = [];

let hands = {
	"p1": myHand,
	"p2": dealerHand
};

let aces = {
	"p1": 0,
	"p2": 0
};

for(let i = 2; i < 11; i++) {
	cardVals.push(i.toString());
}

for(let s of cardSuits) {
	for(let i of cardVals) {
		deck.push(new Card(s, i));
	}
}

let printDeck = (d) => console.log(d.reduce((a,b) => a.toString() + "," + b.toString()));
let getVal = (arr) => arr.reduce((a,b) => a + b.getPoints(a), 0);
let drawCard = (deck, hand) => hand.push(deck.pop());
let discardHand = (deck, hand) => deck.push.apply(deck, hand);

deck = _.shuffle(deck);

printDeck(deck);

let bust = (player) => console.log(player + " busts!");

let calculate = (player) => {
	let total = getVal(hands[player]);
	if(total <= 11 && total + aces[player] +10 <= 21 ) {
		total += 11;
	}
	return total;
};

let hit = (player) => {
	let x = drawCard(deck, hands[player]);
	if(hands[player][x-1].val === 'A') {
		aces[player]++;
	}
	if(calculate(player) > 21) {
		bust(player);
		return true;
	}
	return false;
};

let hitOrNot = (player) => calculate(player) <= 16 + aces[player] > 0 ;

hit("p1");
hit("p1");
printDeck(myHand);
console.log(calculate("p1"));

let hold = () => {
	while(hitOrNot("p2")) {
		if(hit("p2")) {
			return;
		}
	}
	if(calculate("p1") > calculate("p2")) {
		console.log("p1 wins!");
	}
	else {
		console.log("Dealer Wins :(");
	}
};
/*
let cardHTML = () => {
	let h = document.getElementById("playerRow");
	let td = document.createElement("TD");
	let td = document.createElement("TD");

};
*/

var myClass = function (data) {

	this.data = data;
	this.changeData = function (newData) {
		this.data = newData;
	}
}

myClass.prototype.print = function () {
	console.log(this.data);
}

var aClass = new myClass("hello");
aClass.print(); // "hello"




