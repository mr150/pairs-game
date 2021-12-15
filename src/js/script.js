import {Card} from '/js/card.min.js';

const gameSize = 4;
let pairsLeft = gameSize * 2;
const gameElm = document.getElementById('game'),
			curPair = [];

function resetGame() {
	const numSet = new Set(),
				numberLimit = gameSize * 2;

	while(numSet.size < numberLimit) {
		numSet.add(
			(Math.floor(Math.random() * 10) % numberLimit) + 1
		);
	}

	const arrPart = Array.from(numSet);
	const arrFinal = arrPart.concat(
		arrPart.slice().sort(() => Math.random() * 10 - Math.random() * 10)
	);

	for(let i of arrFinal) {
		const card = document.createElement('game-card');
		card.number = i;
		gameElm.append(card);
	}
}

customElements.define('game-card', Card);
resetGame();
