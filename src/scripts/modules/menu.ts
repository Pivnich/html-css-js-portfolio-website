// Menu functionality

const togglers: NodeListOf<HTMLElement> = document.querySelectorAll('[data-toggle-menu]')

// Toggle menu
function toggleMenu(): void {
	const menu: HTMLElement | null = document.querySelector('.menu-links')
	const icons: NodeListOf<HTMLElement> = document.querySelectorAll('.hamburger-icon')
	if (menu) menu.classList.toggle('open')
	icons.forEach((el: HTMLElement) => {
		el.classList.toggle('open')
	})
}

// Attach menu toggle handlers to all togglers
togglers.forEach(function (toggler: HTMLElement): void {
	toggler.addEventListener('click', toggleMenu)
})

export { toggleMenu }
