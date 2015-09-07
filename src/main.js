/*jshint esnext: true */
require('./index.css');

import _ from "lodash";

import Card from "./card.js";

let htmlSuits = {
	S: '&spades;',
	H: '&hearts;',
	D: '&diams;',
	C: '&clubs;'
};
let cardVals = ['A','A',"A",'A'];
let cardSuits = ['S','H',"D","C"];
let deck = [];
let usedDeck = [];

let hands = {
	"p1": [],
	"p2": []
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
let discardHand = (deck, hand) => deck.push.apply(deck, hand);
let drawCard = (deck, player) => {
	var c = deck.pop();
	hands[player].push(c);
	return createCard(c, player);
};

deck = _.shuffle(deck);

printDeck(deck);

let bust = (player) => console.log(player + " busts!");

let calculate = (player) => {
	let total = getVal(hands[player]);
	if(total <= 11 && aces[player] > 0 && total +10 <= 21 ) {
		total += 10;
	}
	return total;
};

let hit = (player) => {
	let c = drawCard(deck, player);
	aces[player] += (c.val === 'A');
	if(calculate(player) > 21) {
		bust(player);
		return true;
	}
	return false;
};

let hitOrNot = () => calculate("p2") <= 16 + aces.p2 > 0;

let hold = () => {
	console.log("hold!");
	while(hitOrNot()) {
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

let createDiv = (css, html) => {
	let elem = document.createElement("DIV");
	elem.className = css;
	elem.innerHTML = html;
	return elem;
};

let createCard = (card, player) => {
	console.log("create card");
	console.log("C" + card);
	let val = card.val;
	let suit = card.suit;
	var color = "";
	if(suit === 'H' || suit === 'D') {
		color = " red";
	}
	let tr = "";
	if (player == "p1") {
		tr = document.getElementById("playerRow");
	}
	else {
		tr = document.getElementById("dealerRow");
	}
	let td = document.createElement("TD");
	td.className = "card";

	td.appendChild(createDiv("topVal" + color, val));
	td.appendChild(createDiv("topSuit" + color, htmlSuits[suit]));
	td.appendChild(createDiv("midSuit" + color, htmlSuits[suit]));
	td.appendChild(createDiv("botSuit flip" + color, htmlSuits[suit]));	
	td.appendChild(createDiv("botVal flip" + color, val));
	tr.appendChild(td);

	return card;
};

let deal = () => {
	document.getElementById("playerRow").innerHTML = "";
	document.getElementById("dealerRow").innerHTML = "";
	hands.p1 = [];
	hands.p2 = [];
	console.log("deal!");
	hit("p1");
	hit("p1");
	hit("p2");
};

window.onload = function() {
	let dbutton = document.getElementById("dealB");
	dbutton.onclick = deal;
	let hitB = document.getElementById("hitB");
	//hitB.onclick = hit("p1");
	let holdB = document.getElementById("holdB");
	holdB.onclick = hold;
};


