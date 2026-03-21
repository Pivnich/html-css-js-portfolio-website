import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

// Cache elements for performance
const headers: NodeListOf<HTMLElement> = document.querySelectorAll(
	'.accordion-item-header',
)
const items: NodeListOf<HTMLElement> =
	document.querySelectorAll('.accordion-item')
const arrows: NodeListOf<HTMLElement> = document.querySelectorAll(
	'.accordion-item-arrow',
)
const backToTopBtn: HTMLElement | null = document.getElementById('backToTop')
const modalTriggers: NodeListOf<HTMLElement> =
	document.querySelectorAll('.modal-trigger')
const modalBackdrop: HTMLElement | null = document.querySelector('.backdrop')

// Function to pause videos (non-blocking, without await)
function pauseVideosInAccordion(activeAccordion: HTMLElement | null): void {
	if (!activeAccordion) return

	// Regular videos
	const videos: HTMLCollectionOf<HTMLVideoElement> =
		activeAccordion.getElementsByTagName('video')
	for (const video of videos) {
		video.muted = true
		video.pause()
	}

	// YouTube videos (asynchronous, but don't wait)
	const accordioniFrames: NodeListOf<HTMLElement> =
		activeAccordion.querySelectorAll('lite-youtube')
	for (const iframe of accordioniFrames) {
		const isActive: boolean = iframe.classList.contains('lyt-activated')
		if (isActive) {
			// Don't wait, just try to pause
			;(iframe as any)
				.getYTPlayer()
				.then((video: any) => video.pauseVideo())
				.catch(() => {})
		}
	}
}

// Closing accordion
function closeAccordion(body: HTMLElement, item: HTMLElement): void {
	pauseVideosInAccordion(item)
	body.style.maxHeight = ''
	item.classList.remove('active')
}

// Opening accordion
function openAccordion(
	item: HTMLElement,
	body: HTMLElement,
	index: number,
): void {
	// Scroll to active accordion (optimized for performance)
	const firstItemTop: number =
		items[0].getBoundingClientRect().top + window.scrollY
	const headerHeight: number = headers[index].offsetHeight
	const gap: number =
		parseFloat(
			getComputedStyle(item.parentElement as HTMLElement).gap || '0',
		) || 0
	let scrollToY: number = firstItemTop + index * (headerHeight + gap)

	// Add offset for hamburger-nav on mobile (if it's fixed)
	const hamburgerNav: HTMLElement | null =
		document.getElementById('hamburger-nav')
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
headers.forEach(function (header: HTMLElement, index: number): void {
	header.addEventListener('click', function (this: HTMLElement): void {
		const item: HTMLElement | null = this.parentElement as HTMLElement
		const body: HTMLElement | null = item.querySelector('.accordion-item-body')

		// Close if already active
		if (item.classList.contains('active')) {
			closeAccordion(body!, item)
			return
		}

		const activeItem: HTMLElement | null = document.querySelector(
			'.accordion-item.active',
		)
		if (activeItem) {
			closeAccordion(
				activeItem.querySelector('.accordion-item-body')!,
				activeItem,
			)
		}

		openAccordion(item, body!, index)
	})
})

// Arrow handler
arrows.forEach(function (arrow: HTMLElement): void {
	arrow.addEventListener('click', function (this: HTMLElement, e: Event): void {
		e.stopPropagation()

		const item: HTMLElement | null = this.closest('.accordion-item')
		const body: HTMLElement | null = item!.querySelector('.accordion-item-body')
		const header: HTMLElement | null = item!.querySelector(
			'.accordion-item-header',
		)

		// Smooth scroll to header
		header!.scrollIntoView({ behavior: 'smooth', block: 'start' })

		// Close after scroll
		setTimeout(() => closeAccordion(body!, item!), 300) // Increased timeout for smoothness
	})
})

// BACK TO TOP with throttle
let scrollTimeout: number | undefined
window.addEventListener('scroll', function (): void {
	clearTimeout(scrollTimeout)
	scrollTimeout = setTimeout(() => {
		const { innerHeight }: { innerHeight: number } = window
		const scrollTop: number =
			document.body.scrollTop || document.documentElement.scrollTop
		if (scrollTop > innerHeight / 2) {
			backToTopBtn!.classList.add('show')
		} else {
			backToTopBtn!.classList.remove('show')
		}
	}, 100) // Throttle at 100ms
})

backToTopBtn!.addEventListener('click', (): void => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
})

// MODAL
function toggleModal(): void {
	const modal: HTMLElement | null = document.querySelector('.modal')
	if (modal) modal.classList.toggle('active')
}

function setModalContent(content: string): void {
	const modalBody: HTMLElement | null = document.querySelector('.modal-body')
	if (modalBody) modalBody.innerHTML = content
}

if (modalBackdrop) {
	modalBackdrop.addEventListener('click', toggleModal)
}

modalTriggers.forEach(function (modalTrigger: HTMLElement): void {
	modalTrigger.addEventListener(
		'click',
		function (this: HTMLElement, e: Event): void {
			const modalInjectContainer: HTMLElement | null = (e.target as HTMLElement)
				?.nextSibling?.nextSibling as HTMLElement
			if (!modalInjectContainer?.classList?.contains('modal-inject')) return

			const modalContent: string = modalInjectContainer.innerHTML
			setModalContent(modalContent)
			toggleModal()
		},
	)
})

// MENU
const togglers: NodeListOf<HTMLElement> =
	document.querySelectorAll('[data-toggle-menu]')
function toggleMenu(): void {
	const menu: HTMLElement | null = document.querySelector('.menu-links')
	const icons: NodeListOf<HTMLElement> =
		document.querySelectorAll('.hamburger-icon')
	if (menu) menu.classList.toggle('open')
	icons.forEach((el: HTMLElement) => {
		el.classList.toggle('open')
	})
}

togglers.forEach(function (toggler: HTMLElement): void {
	toggler.addEventListener('click', toggleMenu)
})
