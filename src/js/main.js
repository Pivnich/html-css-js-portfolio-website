AOS.init()

var swiper = new Swiper('.swiper', {
	slidesPerView: 'auto',
	pagination: {
		el: '.swiper-pagination',
	},
	grabCursor: true,
	centeredSlides: true,
	// loop: true,
	initialSlide: 1,
	spaceBetween: 0,
	breakpoints: {
		768: {
			spaceBetween: 20,
		},
	},
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		scale: 0.7,
		// stretch: 0,
		// depth: 50,
		// modifier: 1,
		// slideShadows: true,
	},
	// navigation: {
	// 	nextEl: '.swiper-button-next',
	// 	prevEl: '.swiper-button-prev',
	// },
	on: {
		click(e) {
			e.slideTo(this.clickedIndex)
		},
	},
})

function toggleMenu() {
	const menu = document.querySelector('.menu-links')
	const icons = document.querySelectorAll('.hamburger-icon')
	menu.classList.toggle('open')
	icons.forEach((el) => {
		el.classList.toggle('open')
	})
}

const DARK_CLASS = 'dark'
function setTheme(isDark) {
	if (isDark) {
		document.body.classList.add(DARK_CLASS)
	} else {
		document.body.classList.remove(DARK_CLASS)
	}
}

function toggleTheme() {
	const isDark = document.body.classList.contains(DARK_CLASS)

	setTheme(!isDark)
}

function toggleThemeHandler() {
	const isDark = document.body.classList.contains(DARK_CLASS)
	toggleTheme()

	// STORAGE
	localStorage.setItem('theme', isDark ? 'light' : 'dark')
}

// uncomment to use dark mode functionality
// const isDark = localStorage.getItem('theme') === 'dark'
// if (isDark) setTheme(true)

// MODAL
// To open modal - element with class name "modal-trigger" and onclick="openModal(event)"
// and sibling element with class name "modal-inject" with needed modal content

function openModal(e) {
	const modalInjectContainer = e.target.nextSibling
	const isContent = modalInjectContainer.classList.contains('modal-inject')
	if (!isContent) return

	const modalContent = modalInjectContainer.innerHTML

	setModalContent(modalContent)
	toggleModal()
}
function setModalContent(content) {
	const modal = document.getElementById('modal')
	modal.getElementsByClassName('modal-content')[0].innerHTML = content
}
function toggleModal() {
	const modal = document.getElementById('modal')
	modal.classList.toggle('open')
}

// BACK TO TOP
const backToTopBtn = document.getElementById('backToTop')

window.onscroll = function () {
	scrollFunction()
}

function scrollFunction() {
	const { innerHeight } = window
	if (
		document.body.scrollTop > innerHeight / 2 ||
		document.documentElement.scrollTop > innerHeight / 2
	) {
		backToTopBtn.classList.add('show')
	} else {
		backToTopBtn.classList.remove('show')
	}
}

function topFunction() {
	// document.body.scrollTop = 0; // For Safari
	// document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ACCORDION
const headers = document.querySelectorAll('.accordion-item-header')
const arrows = document.querySelectorAll('.accordion-item-arrow')

headers.forEach(function (header) {
	header.addEventListener('click', function () {
		const item = this.parentElement
		const body = item.querySelector('.accordion-item-body')

		if (item.classList.contains('active')) {
			body.style.maxHeight = null
			item.classList.remove('active')
		} else {
			document
				.querySelectorAll('.accordion-item')
				.forEach(function (otherItem) {
					if (otherItem !== item) {
						otherItem.classList.remove('active')
						otherItem.querySelector('.accordion-item-body').style.maxHeight =
							null
					}
				})

			item.classList.add('active')
			body.style.maxHeight = body.scrollHeight + 'px'
		}
	})
})

arrows.forEach(function (arrow) {
	arrow.addEventListener('click', function (e) {
		e.stopPropagation()

		const item = this.closest('.accordion-item')
		const body = item.querySelector('.accordion-item-body')
		const header = item.querySelector('.accordion-item-header')

		header.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})

		setTimeout(function () {
			body.style.maxHeight = null
			item.classList.remove('active')
		}, 10)
	})
})
