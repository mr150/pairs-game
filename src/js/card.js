export class Card extends HTMLElement {
	number;

	connectedCallback() {
		this.textContent = '-';
		this.tabIndex = 0;
	}

	get opened() {
		return !this.hasAttribute('tabindex');
	}

	open() {
		this.textContent = this.number;
		this.removeAttribute('tabindex');
	}

	close() {
		this.textContent = '-';
		this.setAttribute('tabindex', 0);
	}
}
