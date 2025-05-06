import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

async function setAllVideosMuted() {
	const videos = document.getElementsByTagName('video')
	for (const video of videos) {
		video.muted = true
	}

	const accordioniFrames = document
		.querySelector('.accordion-wrapper')
		.querySelectorAll('lite-youtube')
	for (const iframe of accordioniFrames) {
		const video = await iframe.getYTPlayer()
		video.pauseVideo()
	}
}

// ACCORDION
const headers = document.querySelectorAll('.accordion-item-header')
const arrows = document.querySelectorAll('.accordion-item-arrow')

function closeAccordion(body, item) {
	body.style.maxHeight = null
	item.classList.remove('active')
	setAllVideosMuted()
}

headers.forEach(function (header) {
	header.addEventListener('click', function () {
		const item = this.parentElement
		const body = item.querySelector('.accordion-item-body')

		if (item.classList.contains('active')) {
			closeAccordion(body, item)
		} else {
			const activeItem = document.querySelector('.accordion-item.active')
			if (activeItem) {
				closeAccordion(
					activeItem.querySelector('.accordion-item-body'),
					activeItem
				)
			}

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
			closeAccordion(body, item)
		}, 10)
	})
})

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

document.getElementById('backToTop').addEventListener('click', () => {
	// document.body.scrollTop = 0; // For Safari
	// document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	window.scrollTo({ top: 0, behavior: 'smooth' })
})

// MODAL
// To open modal - element with class name "modal-trigger" and onclick="openModal(event)"
// and sibling element with class name "modal-inject" with needed modal content

const modalTriggers = document.querySelectorAll('.modal-trigger')
const modalBackdrop = document.querySelector('.backdrop')

modalBackdrop.addEventListener('click', toggleModal)

modalTriggers?.forEach(function (modalTrigger) {
	modalTrigger.addEventListener('click', function (e) {
		console.log(e)
		const modalInjectContainer = e.target?.nextSibling.nextSibling
		console.log(modalInjectContainer)
		const isContent = modalInjectContainer.classList?.contains('modal-inject')
		if (!isContent) return

		const modalContent = modalInjectContainer.innerHTML

		setModalContent(modalContent)
		toggleModal()
	})
})

// function openModal(e) {
// 	const modalInjectContainer = e.target.nextSibling
// 	const isContent = modalInjectContainer.classList.contains('modal-inject')
// 	if (!isContent) return

// 	const modalContent = modalInjectContainer.innerHTML

// 	setModalContent(modalContent)
// 	toggleModal()
// }
function setModalContent(content) {
	const modal = document.getElementById('modal')
	console.log(modal)
	modal.getElementsByClassName('modal-content')[0].innerHTML = content
}
function toggleModal() {
	const modal = document.getElementById('modal')
	modal?.classList.toggle('open')
}

// MENU
const togglers = document.querySelectorAll('[data-toggle-menu]')
function toggleMenu() {
	const menu = document.querySelector('.menu-links')
	const icons = document.querySelectorAll('.hamburger-icon')
	menu.classList.toggle('open')
	icons.forEach((el) => {
		el.classList.toggle('open')
	})
}

togglers.forEach(function (toggler) {
	toggler.addEventListener('click', toggleMenu)
})
