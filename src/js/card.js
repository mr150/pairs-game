export class Card extends HTMLElement {
	number;

	connectedCallback() {
		this.textContent = '?';
		this.tabIndex = 0;
	}

	open() {
		this.textContent = this.number;
	}

	close() {
		this.textContent = '?';
	}
}
