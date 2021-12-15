import {Card} from '/js/card.min.js';

const gameSize = 4;
let pairsLeft = 0;
const gameElm = document.getElementById('game'),
			againElm = document.getElementById('btn-again'),
			curPair = [];

function resetGame(e) {
	if(e !== undefined) e.target.hidden = true;

	gameElm.innerHTML = '';
	curPair.length = 0;
	pairsLeft = gameSize * gameSize;

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

function pickCard(e) {
	const {target} = e;

	if(
		e.currentTarget !== target && pairsLeft && (
			e.type === 'click' || (
				e.type === 'keyup' && (e.code === 'Enter' || e.code === 'Space')
			)
		) && !target.opened
	) {
		if(curPair.length === 2) {
			if(curPair[0].number !== curPair[1].number) {
				curPair.forEach(item => item.close());
				pairsLeft += 2;
			}

			curPair.length = 0;
		}

		target.open();
		curPair.push(target);
		pairsLeft--;
	}

	if(pairsLeft === 0) {
		againElm.hidden = false;
	}
}

customElements.define('game-card', Card);

gameElm.addEventListener('click', pickCard);
gameElm.addEventListener('keyup', pickCard, true);
againElm.addEventListener('click', resetGame);
resetGame();
