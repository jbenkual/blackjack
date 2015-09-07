/*jshint esnext: true */
require("url-loader?mimetype=image/png!../img/back.png");
require('../css/index.css');


import _ from "lodash";

import Card from "./card.js";

let htmlSuits = {
	S: '&spades;',
	H: '&hearts;',
	D: '&diams;',
	C: '&clubs;'
};

let dom = {};

let cardVals = ['A', 'K', "Q", 'J'];
let cardSuits = ['S', 'H', "D", "C"];
let deck = [];
let usedDeck = [];
let soft = false;
let buttonActive = {
	deal: true,
	hit: false,
	hold: false
};

let hands = {
	"p1": [],
	"p2": []
};

let aces = {
	"p1": 0,
	"p2": 0
};


let init = () => {
	for (let i = 2; i < 11; i++) {
		cardVals.push(i.toString());
	}

	for (let s of cardSuits) {
		for (let i of cardVals) {
			deck.push(new Card(s, i));
		}
	}
	deck = _.shuffle(deck);
};

let printDeck = (d) => console.log(d.reduce((a, b) => a.toString() + "," + b.toString()));
let getVal = (arr) => arr.reduce((a, b) => a + b.getPoints(a), 0);
let discardHand = (deck, hand) => deck.push.apply(deck, hand);
let drawCard = (deck, player) => {
	var c = deck.pop();
	hands[player].push(c);
	return createCard(c, player);
};

let reshuffle = () => {
	deck = usedDeck.splice(0);
	deck = _.shuffle(deck);
};

let bust = (player) => victory(Object.keys(hands)[2-player[1]]);

let calculate = (player) => {
	let total = getVal(hands[player]);
	soft = false;
	if (total <= 11 && aces[player] > 0 && total + 10 <= 21) {
		total += 10;
		soft = (player === 'p2');
	}
	return total;
};

let hit = (player) => {
	if(!buttonActive.hit) {
		return;
	}
	let c = drawCard(deck, player);
	aces[player] += (c.val === 'A');
	var score = calculate(player);
	dom['score' + player[1]].innerHTML = "Score: " + score;
	console.log(player + " score: " +score);
	console.log(hands[player]);
	if(score > 21) {
		bust(player);
		return true;
	}
	else if (score == 21) {
		hold();
		return true;
	}
	return false;
};

let hitClick = (e) => hit("p1");

let hitOrNot = () => calculate("p2") <= 16 + soft;

let hold = () => {
	if(!buttonActive.hold) {
		return;
	}
	if (hitOrNot()) {
		if (hit("p2")) {
			return;
		}
		setTimeout(hold, 1000);
	}
	else {
		if (calculate("p1") > calculate("p2")) {
			victory("p1");
		} else {
			victory("p2");
		}
	}
};

let createDiv = (css, html) => {
	let elem = document.createElement("DIV");
	elem.className = css;
	elem.innerHTML = html;
	return elem;
};

let createCard = (card, player) => {
	let val = card.val;
	let suit = card.suit;

	var color = "";
	if (suit === 'H' || suit === 'D') {
		color = " red";
	}

	let tr = "";
	if (player == "p1") {
		tr = document.getElementById("playerRow");
	} else {
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

let victory = (player) => {
	console.log("v = " + player);
	let v = document.getElementById("victoryMessage");
	if(player === "p1") {
		v.innerHTML = "You win!";
	} 
	else if(player === "p2") {
		v.innerHTML = "You lose!";
	}
	else {
		v.innerHTML = "Its a draw!";
	}
	dom.dealB.className = dom.dealB.className.replace(/ disabled/g, "");
	dom.hitB.className += " disabled";
	dom.holdB.className += " disabled";
	buttonActive.deal = true;
	buttonActive.hit = false;
	buttonActive.hold = false;
};

let deal = () => {
	if(!buttonActive.deal) {
		return;
	}
	dom.pRow.innerHTML = "";
	dom.dRow.innerHTML = "";
	dom.victoryMessage.innerHTML = "";
	dom.dealB.className += " disabled";
	dom.hitB.className = dom.hitB.className.replace(/ disabled/g, "");
	dom.holdB.className = dom.holdB.className.replace(/ disabled/g, "");
	dom.score1.className = "score";
	dom.score2.className = "score";

	deck.push.apply(deck, hands.p1);
	deck.push.apply(deck, hands.p2);
	_.shuffle(deck);
	hands.p1 = [];
	hands.p2 = [];
	aces.p1 = 0;
	aces.p2 = 0;
	buttonActive.deal = false;
	buttonActive.hold = true;
	buttonActive.hit = true;

	hit("p1");
	hit("p1");
	hit("p2");

	let t1 = calculate("p1");
	let t2 = calculate("p2");

	if (t1 === 21 || t2 === 21) {
		if (t1 === t2) {
			victory("draw");
		} else if (t1 === 21) {
			victory("p1");
		} else {
			victory("t2");
		}
	}
};

window.onload = function() {
	init();
	dom.dealB = document.getElementById("dealB");
	dom.dealB.onclick = deal;
	dom.hitB = document.getElementById("hitB");
	dom.hitB.onclick = hitClick;
	dom.holdB = document.getElementById("holdB");
	dom.holdB.onclick = hold;
	dom.pRow = document.getElementById("playerRow");
	dom.dRow = document.getElementById("dealerRow");
	dom.victoryMessage = document.getElementById("victoryMessage");
	dom.score1 = document.getElementById("score1");
	dom.score2 = document.getElementById("score2");
};