export class Card extends HTMLElement {
	connectedCallback() {
		this.textContent = '-';
		this.tabIndex = 0;

		// показывать число в атрибуте для отладки
		this.setAttribute('data-debug', this.number);
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
