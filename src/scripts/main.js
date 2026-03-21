import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

// Cache elements for performance
const headers = document.querySelectorAll('.accordion-item-header')
const items = document.querySelectorAll('.accordion-item')
const arrows = document.querySelectorAll('.accordion-item-arrow')
const backToTopBtn = document.getElementById('backToTop')
const modalTriggers = document.querySelectorAll('.modal-trigger')
const modalBackdrop = document.querySelector('.backdrop')

// Function to pause videos (non-blocking, without await)
function pauseVideosInAccordion(activeAccordion) {
	if (!activeAccordion) return

	// Regular videos
	const videos = activeAccordion.getElementsByTagName('video')
	for (const video of videos) {
		video.muted = true
		video.pause()
	}

	// YouTube videos (asynchronous, but don't wait)
	const accordioniFrames = activeAccordion.querySelectorAll('lite-youtube')
	for (const iframe of accordioniFrames) {
		const isActive = iframe.classList.contains('lyt-activated')
		if (isActive) {
			// Don't wait, just try to pause
			iframe
				.getYTPlayer()
				.then((video) => video.pauseVideo())
				.catch(() => {})
		}
	}
}

// Closing accordion
function closeAccordion(body, item) {
	pauseVideosInAccordion(item)
	body.style.maxHeight = null
	item.classList.remove('active')
}

// Opening accordion
function openAccordion(item, body, index) {
	// Scroll to active accordion (optimized for performance)
	const firstItemTop = items[0].getBoundingClientRect().top + window.scrollY
	const headerHeight = headers[index].offsetHeight
	const gap = parseFloat(getComputedStyle(item.parentElement).gap || 0) || 0
	let scrollToY = firstItemTop + index * (headerHeight + gap)

	// Add offset for hamburger-nav on mobile (if it's fixed)
	const hamburgerNav = document.getElementById('hamburger-nav')
	if (hamburgerNav && window.innerWidth <= 768) {
		scrollToY -= hamburgerNav.offsetHeight
	}

	// Use requestAnimationFrame for smooth scroll without blocking
	requestAnimationFrame(() => {
		window.scrollTo({ top: scrollToY, behavior: 'smooth' })
	})

	item.classList.add('active')
	body.style.maxHeight = body.scrollHeight + 'px'
}

// Header click handler
headers.forEach(function (header, index) {
	header.addEventListener('click', function () {
		const item = this.parentElement
		const body = item.querySelector('.accordion-item-body')

		// Close if already active
		if (item.classList.contains('active')) {
			closeAccordion(body, item)
			return
		}

		const activeItem = document.querySelector('.accordion-item.active')
		if (activeItem) {
			closeAccordion(
				activeItem.querySelector('.accordion-item-body'),
				activeItem,
			)
		}

		openAccordion(item, body, index)
	})
})

// Arrow handler
arrows.forEach(function (arrow) {
	arrow.addEventListener('click', function (e) {
		e.stopPropagation()

		const item = this.closest('.accordion-item')
		const body = item.querySelector('.accordion-item-body')
		const header = item.querySelector('.accordion-item-header')

		// Smooth scroll to header
		header.scrollIntoView({ behavior: 'smooth', block: 'start' })

		// Close after scroll
		setTimeout(() => closeAccordion(body, item), 300) // Increased timeout for smoothness
	})
})

// BACK TO TOP with throttle
let scrollTimeout
window.addEventListener('scroll', function () {
	clearTimeout(scrollTimeout)
	scrollTimeout = setTimeout(() => {
		const { innerHeight } = window
		const scrollTop =
			document.body.scrollTop || document.documentElement.scrollTop
		if (scrollTop > innerHeight / 2) {
			backToTopBtn.classList.add('show')
		} else {
			backToTopBtn.classList.remove('show')
		}
	}, 100) // Throttle at 100ms
})

backToTopBtn.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
})

// MODAL
function toggleModal() {
	const modal = document.querySelector('.modal')
	if (modal) modal.classList.toggle('active')
}

function setModalContent(content) {
	const modalBody = document.querySelector('.modal-body')
	if (modalBody) modalBody.innerHTML = content
}

modalBackdrop.addEventListener('click', toggleModal)

modalTriggers?.forEach(function (modalTrigger) {
	modalTrigger.addEventListener('click', function (e) {
		const modalInjectContainer = e.target?.nextSibling?.nextSibling
		if (!modalInjectContainer?.classList?.contains('modal-inject')) return

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
