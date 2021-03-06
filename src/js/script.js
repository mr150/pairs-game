import {Card} from '/js/card.min.js';

const gameSize = 4;
let pairsLeft = 0;
const gameElm = document.getElementById('game'),
			againElm = document.getElementById('btn-again'),
			curPair = [];

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

function resetGame(e) {
	if(e !== undefined) e.target.hidden = true;

	gameElm.innerHTML = '';
	curPair.length = 0;
	pairsLeft = gameSize * gameSize;

	const arrPart = [],
				numberLimit = gameSize * 2;

	while(arrPart.length < numberLimit) {
		arrPart.push(arrPart.length + 1);
	}

	shuffle(arrPart.concat(arrPart)).forEach(item => {
		// можно было использовать <button>, но кастомный элемент показался удобнее
		const card = document.createElement('game-card');
		card.number = item;
		gameElm.append(card);
	});
}

function openCard(e) {
	const {target} = e;

	if(
		e.currentTarget !== target && (
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

gameElm.addEventListener('click', openCard);
gameElm.addEventListener('keyup', openCard, true);
againElm.addEventListener('click', resetGame);
resetGame();
